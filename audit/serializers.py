from rest_framework import serializers
from .models import Hardware


class HardwareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hardware
        fields = ['id', 'computer_name', 'processor_info', 'memory_info', 'monitor_info', 'owner']


