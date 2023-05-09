from rest_framework import serializers
from .models import Ticket, Status, Category
from django.contrib.auth.models import User
from rest_framework.serializers import Serializer, ModelSerializer, CharField


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ['status_id', 'name']
    status_id = serializers.IntegerField()
    name = serializers.CharField(required=False)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_id', 'name']
    category_id = serializers.IntegerField()
    name = serializers.CharField(required=False)


class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['username']

    def to_representation(self, instance):
            return {
                'username': instance.username
            }


# class TicketSerializer(serializers.ModelSerializer):
#     # author = UserSerializer()
#
#     status = StatusSerializer()
#     category = CategorySerializer()
#
#     class Meta:
#         model = Ticket
#         fields = '__all__'
#
#     def create(self, validated_data):
#             status_data = validated_data.pop('status')
#             category_data = validated_data.pop('category')
#             status = Status.objects.get(**status_data)
#             category = Category.objects.get(**category_data)
#             return Ticket.objects.create(status=status, category=category, **validated_data)

# class TicketSerializer(serializers.ModelSerializer):
#     # created_at = serializers.DateTimeField(format='%d-%m-%Y %H:%M:%S')
#     # updated_at = serializers.DateTimeField(format='%d-%m-%Y %H:%M:%S')
#     status = StatusSerializer()
#     category = CategorySerializer()
#
#     class Meta:
#         model = Ticket
#         fields = ['title', 'description', 'status', 'category', 'author']
#
#     def create(self, validated_data):
#         category_data = validated_data.pop('category')
#         category = Category.objects.get(category_id=category_data['category_id'])
#         status_data = validated_data.pop('status')
#         status = Status.objects.get(status_id=status_data['status_id'])
#         ticket = Ticket.objects.create(category=category, status=status, **validated_data)
#         return ticket


class TicketSerializer(serializers.Serializer):
    author = UserSerializer()
    created_at = serializers.DateTimeField(format='%d-%m-%Y %H:%M:%S', required=False)
    updated_at = serializers.DateTimeField(format='%d-%m-%Y %H:%M:%S', required=False)
    title = serializers.CharField(max_length=255)
    description = serializers.CharField()
    category = CategorySerializer()
    status = StatusSerializer()

    def create(self, validated_data):
        category = Category.objects.get(category_id=validated_data['category']['category_id'])
        status = Status.objects.get(status_id=validated_data['status']['status_id'])
        if 'username' in validated_data['author']:
            if User.objects.filter(username=validated_data['author']['username']).exists():
                author = User.objects.get(username=validated_data['author']['username'])
            else:
                author = User.objects.create(username='')
        ticket = Ticket.objects.create(
            title=validated_data['title'],
            description=validated_data['description'],
            category=category,
            status=status,
        )
        return ticket



# class LoginRequestSerializer(Serializer):
#     model = User
#     username = CharField(required=True)
#     password = CharField(required=True)
