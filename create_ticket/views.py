from rest_framework import generics
from rest_framework.generics import RetrieveAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer, TicketCreateSerializer, TicketViewSerializer
from rest_framework import viewsets, status
from django.shortcuts import get_object_or_404
from .models import Ticket, Category, Status
from django.contrib.auth.models import User
from django.http import JsonResponse

#для просмотра user
@api_view()
@permission_classes([IsAuthenticated])
def user(request: Request):
    return Response({
        'data': UserSerializer(request.user).data
    })


# GET метод для просмотра тикетов
class TicketViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

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


# GET метод для просмотра деталей тикета
class TicketDetailView(RetrieveAPIView):
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


# POST метод для добавления тикета
@api_view(['POST'])
@permission_classes([AllowAny])
def create_ticket(request):
    serializer = TicketCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({'status': 'success', 'ticket_id': serializer.instance.id})
    else:
        print(serializer.errors)
        return JsonResponse({'status': 'error', 'message': 'Invalid data'}, status=400)


