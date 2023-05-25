from rest_framework import viewsets
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Hardware
from .serializers import HardwareSerializer
from django.shortcuts import render


class HardwareDetail(RetrieveAPIView):
    queryset = Hardware.objects.all()
    serializer_class = HardwareSerializer


class HardwareViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = Hardware.objects.all()
        serializer = HardwareSerializer(queryset, many=True, context={'request': request})
        data = serializer.data
        for idx, hardware_data in enumerate(data):
            hardware_data['id'] = queryset[idx].id
        return Response(data)