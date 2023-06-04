import json
from rest_framework import generics
from rest_framework.generics import RetrieveAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer, TicketCreateSerializer, TicketViewSerializer
from rest_framework import viewsets, status
from django.shortcuts import get_object_or_404
from .models import Ticket, Category, Status, Comment
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import FileResponse
from telegram_notifier import send_message_about_new_ticket, send_message_about_new_comment, send_message_about_update_ticket

#для просмотра user
@api_view()
@permission_classes([IsAuthenticated])
def user(request: Request):
    return Response({
        'data': UserSerializer(request.user).data
    })


# GET метод для просмотра тикетов
class TicketViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = Ticket.objects.all()
        serializer = TicketViewSerializer(queryset, many=True, context={'request': request})
        data = serializer.data
        for idx, ticket_data in enumerate(data):
            ticket_data['id'] = queryset[idx].id
        return Response(data)

    def retrieve(self, request, pk=None):
        queryset = Ticket.objects.all()
        ticket = get_object_or_404(queryset, pk=pk)
        serializer = TicketViewSerializer(ticket)
        return Response(serializer.data)


# GET метод для просмотра деталей юзера
class UserDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data

        # Добавляем информацию о группе в возвращаемые данные
        groups = instance.groups.all()
        group_names = [group.name for group in groups]
        data['groups'] = group_names

        return Response(data)


# GET метод для просмотра деталей тикета
class TicketDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketViewSerializer


#обновление данных тикета
    def put(self, request, pk):
        try:
            ticket = Ticket.objects.get(id=pk)
        except Ticket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Проверяем, были ли изменения в полях и добавляем их в объект `data`
        data = {}
        if 'title' in request.data and request.data['title'] != ticket.title:
            data['title'] = request.data['title']
        if 'description' in request.data and request.data['description'] != ticket.description:
            data['description'] = request.data['description']

        # Проверяем наличие category_id и status_id в запросе
        if 'category_id' in request.data:
            category_id = request.data['category_id']
            if category_id is not None and category_id != ticket.category_id:
                data['category_id'] = category_id

        if 'agent_id' in request.data:
            agent_id = request.data['agent_id']
            if agent_id is not None and agent_id != ticket.agent_id:
                data['agent_id'] = agent_id

        if 'status_id' in request.data:
            status_id = request.data['status_id']
            if status_id is not None and status_id != ticket.status_id:
                data['status_id'] = status_id

        # Обновляем значения полей тикета
        if data:
            ticket.title = data.get('title', ticket.title)
            ticket.description = data.get('description', ticket.description)
            ticket.category_id = data.get('category_id', ticket.category_id)
            ticket.status_id = data.get('status_id', ticket.status_id)
            ticket.agent_id = data.get('agent_id', ticket.agent_id)
            ticket.save()

            #для уведомления
            ticket_id = ticket.id
            title = ticket.title
            category = ticket.category
            ticket_status = ticket.status
            agent = ticket.agent
            send_message_about_update_ticket(ticket_id, title, category, ticket_status, agent)

        return Response(status=status.HTTP_200_OK)


# список словаря Категории
def category_list(request):
    categories = Category.objects.all()
    data = [{'category_id': c.category_id, 'name': c.name} for c in categories]
    return JsonResponse(data, safe=False)


# список словаря Статус
def status_list(request):
    categories = Status.objects.all()
    data = [{'status_id': c.status_id, 'name': c.name} for c in categories]
    return JsonResponse(data, safe=False)


# # POST метод для добавления тикета
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def create_ticket(request):
#     serializer = TicketCreateSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return JsonResponse({'status': 'success', 'ticket_id': serializer.instance.id})
#     else:
#         print(serializer.errors)
#         return JsonResponse({'status': 'error', 'message': 'Invalid data'}, status=400)

@csrf_exempt
def create_ticket(request):
    try:
        if request.method == 'POST':
            print(request.POST)
            print(request.FILES)
            title = request.POST['title']
            description = request.POST['description']
            category_id = request.POST['category_id']
            # Получите объект Status с status_id равным 1
            status = Status.objects.get(status_id=1)
            author_id = request.POST['author']
            author = User.objects.get(id=author_id)
            # Создайте новый тикет с полученными данными и установите значение поля status
            ticket = Ticket.objects.create(title=title, description=description, category_id=category_id, status=status,
                                           author=author)
            # Сохраните загруженный файл
            if 'attach' in request.FILES:
                file = request.FILES['attach']
                ticket.attach.save(file.name, file)

            # Отправка сообщения в канал
            send_message_about_new_ticket(ticket.id, ticket.title, ticket.category.name)

            # Отправьте ответ об успешном создании тикета
            return JsonResponse({'message': 'Тикет успешно добавлен'})
        else:
            # Возвращаем ответ, что только метод POST разрешен
            return JsonResponse({'error': 'Метод не разрешен'}, status=405)

    except Exception as e:
        # В случае ошибки верните ответ с кодом ошибки и сообщением
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def get_ticket_comments(request, ticket_id):
    if request.method == 'GET':
        # Здесь выполняйте логику для получения комментариев, относящихся к тикету с указанным ticket_id
        comments = Comment.objects.filter(ticket_id=ticket_id).values()

        # Возвращайте список комментариев в формате JSON
        return JsonResponse(list(comments), safe=False)
    elif request.method == 'POST':
        # Создайте новый комментарий
        data = json.loads(request.body)
        content = data.get('content')
        author = data.get('author')
        print(content)
        if content is not None:
            ticket = Ticket.objects.get(id=ticket_id)
            new_comment = Comment(
                ticket_id=ticket,
                content=content,
                author_id=author,
            )
            new_comment.save()

            #для уведомлений
            ticket = Ticket.objects.get(id=ticket_id)
            title = ticket.title
            category = ticket.category.name
            comment = new_comment.content
            author = new_comment.author
            send_message_about_new_comment(ticket_id, title, category, comment, author)
            return JsonResponse({'message': 'Comment created successfully'})
        else:
            return JsonResponse({'error': 'Content cannot be empty'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# для скачивания файлов
def download_file(request, file_path):
    file = open(file_path, 'rb')
    response = FileResponse(file)
    return response
