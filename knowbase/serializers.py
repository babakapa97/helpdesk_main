from rest_framework import serializers
from .models import Knowledge, Section


class KnowledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Knowledge
        fields = ['id', 'title', 'content', 'author', 'attach']


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['section_id', 'name']
