from rest_framework import viewsets
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Hardware
from .serializers import HardwareSerializer
from rest_framework.views import APIView
from rest_framework import status


class HardwareCreateView(APIView):
    def get(self, request):
        owner = request.query_params.get('owner')
        if owner:
            hardware = Hardware.objects.filter(owner=owner)
        else:
            hardware = Hardware.objects.all()
        serializer = HardwareSerializer(hardware, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = HardwareSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

