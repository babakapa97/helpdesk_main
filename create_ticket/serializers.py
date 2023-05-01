from rest_framework import serializers
from .models import Ticket
from django.contrib.auth.models import User
from rest_framework.serializers import Serializer, ModelSerializer, CharField


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class LoginRequestSerializer(Serializer):
    model = User

    username = CharField(required=True)
    password = CharField(required=True)


