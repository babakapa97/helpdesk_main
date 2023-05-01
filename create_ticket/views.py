from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer, LoginRequestSerializer
# from django.contrib.auth import authenticate, login


# @api_view(['POST'])
# @permission_classes([AllowAny])
# # def login(request: Request):
# #     serializer = LoginRequestSerializer(data=request.data)
# #     if serializer.is_valid():
# #         authenticated_user = authenticate(**serializer.validated_data)
# #         if authenticated_user is not None:
# #             login(request, authenticated_user)
# #             return Response({'status': 'Success'})
# #         else:
# #             return Response({'error': 'Invalid credentials'}, status=403)
# #     else:
# #         return Response(serializer.errors, status=400)


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user(request: Request):
    return Response({
        'data': UserSerializer(request.user).data
    })
