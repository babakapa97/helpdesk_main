from rest_framework import serializers
from .models import Ticket, Status, Category
from django.contrib.auth.models import User
from rest_framework.serializers import Serializer, ModelSerializer, CharField
from drf_writable_nested import WritableNestedModelSerializer


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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

    id = serializers.IntegerField(required=False)
    username = serializers.CharField(required=False)

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'username': instance.username,
            'first_name': instance.first_name,
            'last_name': instance.last_name,
        }

# сериалайзер для создания тикетов
class TicketCreateSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    # author = UserSerializer()
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    created_at = serializers.DateTimeField(format='%d-%m-%Y %H:%M:%S', required=False)
    updated_at = serializers.DateTimeField(format='%d-%m-%Y %H:%M:%S', required=False)
    title = serializers.CharField(max_length=255)
    description = serializers.CharField()
    category = CategorySerializer()
    status = StatusSerializer()

    class Meta:
        model = Ticket
        fields = ('id', 'title', 'description', 'status', 'category', 'author', 'created_at', 'updated_at')


def to_representation(self, instance):
    representation = super().to_representation(instance)
    # representation['author'] = {
    #     'id': instance.author.id,
    #     'username': instance.author.username,
    # }
    representation['author'] = UserSerializer(instance.author).data
    return representation


def create(self, validated_data):
    category_id = validated_data['category']['category_id']
    status_id = validated_data['status']['status_id']
    # author_id = validated_data['author']['author_id']
    author = validated_data['author']

    ticket = Ticket.objects.create(
        title=validated_data['title'],
        description=validated_data['description'],
        category_id=category_id,
        status_id=status_id,
        # author_id=author_id
        author=author
    )

    return ticket

#сериалайзер для просмотра тикетов
class TicketViewSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    category = CategorySerializer()
    status = StatusSerializer()
    created_at = serializers.DateTimeField(format='%d-%m-%Y %H:%M:%S', required=False)
    updated_at = serializers.DateTimeField(format='%d-%m-%Y %H:%M:%S', required=False)
    title = serializers.CharField(max_length=255)
    description = serializers.CharField()

    class Meta:
        model = Ticket
        fields = ('id', 'title', 'description', 'status', 'category', 'author', 'created_at', 'updated_at')



#
class LoginRequestSerializer(Serializer):
    model = User
    username = CharField(required=True)
    password = CharField(required=True)
