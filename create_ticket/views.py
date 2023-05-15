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
from .serializers import LoginRequestSerializer
from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth import authenticate, login



@api_view()
@permission_classes([IsAuthenticated])
# @authentication_classes([JWTAuthentication])
def user(request: Request):
    return Response({
        'data': UserSerializer(request.user).data
    })

# метод для проверки логина пароля, но он тут уже нафиг не нужон
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def login(request: Request):
#     serializer = LoginRequestSerializer(data=request.data)
#     if serializer.is_valid():
#         authenticated_user = authenticate(**serializer.validated_data)
#         if authenticated_user is not None:
#             login(request, authenticated_user)
#             return Response({'status': 'Success'}, status=200)
#         else:
#             return Response({'error': 'Invalid credentials'}, status=403)
#     else:
#         return Response(serializer.errors, status=400)


# GET метод для просмотра тикетов
class TicketViewSet(viewsets.ViewSet):
    # authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = Ticket.objects.all()
        serializer = TicketSerializer(queryset, many=True, context={'request': request})
        data = serializer.data
        for idx, ticket_data in enumerate(data):
            ticket_data['id'] = queryset[idx].id
        return Response(data)

    def retrieve(self, request, pk=None):
        queryset = Ticket.objects.all()
        ticket = get_object_or_404(queryset, pk=pk)
        serializer = TicketSerializer(ticket)
        return Response(serializer.data)


# GET метод для просмотра деталей тикета
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


# POST метод для добавления тикета
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




