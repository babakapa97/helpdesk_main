from django.contrib.auth import authenticate, login
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer, TicketSerializer
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .models import Ticket

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
        serializer = UserSerializer(user)
        return Response(serializer.data)

