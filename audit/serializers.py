from rest_framework import serializers
from .models import Hardware, HardwareType


class HardwareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hardware
        fields = ['id', 'type', 'owner']


class HardwareTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HardwareType
        fields = ['type_id', 'name']
