from django.contrib.auth import authenticate, login
from rest_framework.generics import RetrieveAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer, TicketSerializer
from rest_framework import viewsets, status
from django.shortcuts import get_object_or_404
from .models import Ticket, Category, Status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# from django.contrib.auth import authenticate, login


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def login(request: Request):
#     serializer = LoginRequestSerializer(data=request.data)
#     if serializer.is_valid():
#         authenticated_user = authenticate(**serializer.validated_data)
#         if authenticated_user is not None:
#             login(request, authenticated_user)
#             return Response({'status': 'Success'})
#         else:
#             return Response({'error': 'Invalid credentials'}, status=403)
#     else:
#         return Response(serializer.errors, status=400)


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user(request: Request):
    return Response({
        'data': UserSerializer(request.user).data
    })


class TicketViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving tickets.
    """
    # authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]

    def list(self, request):
        queryset = Ticket.objects.all()
        serializer = TicketSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Ticket.objects.all()
        ticket = get_object_or_404(queryset, pk=pk)
        serializer = TicketSerializer(ticket)
        return Response(serializer.data)


class TicketDetailView(RetrieveAPIView):
        queryset = Ticket.objects.all()
        serializer_class = TicketSerializer


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


# POST-метод для Tickets
# @csrf_exempt
# @permission_classes([AllowAny])
# def create_ticket(request):
#     if request.method == 'POST':
#        # print(request.data)
#         title = request.POST.get('title')
#         description = request.POST.get('description')
#         category = request.POST.get('category_id')
#         status = request.POST.get('status_id')
#         author = request.POST.get('author')
#
#         # сохраняем тикет в базу данных
#         ticket = Ticket(title=title, description=description, category=category, status=status, author=author)
#         ticket.save()
#
#         return JsonResponse({'status': 'success', 'ticket_id': ticket.id})
#     else:
#         return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

# @csrf_exempt
# def post(self, request):
#     serializer = TicketSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def create_ticket(request):
    print(request.data)
    serializer = TicketSerializer(data=request.data)
    print(serializer.initial_data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({'status': 'success', 'ticket_id': serializer.instance.id})
    else:
        print(serializer.errors)
        return JsonResponse({'status': 'error', 'message': 'Invalid data'}, status=400)



# @api_view(['POST'])
# def create_ticket(request):
#     print(request.data)
#     serializer = TicketSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=201)
#     return Response(serializer.errors, status=400)

