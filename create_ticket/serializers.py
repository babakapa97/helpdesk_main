from rest_framework import serializers
from .models import Ticket
from django.contrib.auth.models import User
from rest_framework.serializers import Serializer, ModelSerializer, CharField


# class StatusSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Status
#         fields = ['name']
#
#
# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = ['name']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class TicketSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    created_at = serializers.DateTimeField(format='%d-%m-%Y %H:%M:%S')
    updated_at = serializers.DateTimeField(format='%d-%m-%Y %H:%M:%S')
    # status = serializers.ChoiceField(choices=status_choices)
    # category = serializers.ChoiceField(choices=category_choices)

    class Meta:
        model = Ticket
        fields = '__all__'







# class LoginRequestSerializer(Serializer):
#     model = User
#     username = CharField(required=True)
#     password = CharField(required=True)
