from rest_framework import serializers
from .models import Knowledge, Section


class KnowledgeSerializer(serializers.ModelSerializer):
    section = serializers.SerializerMethodField()

    def get_section(self, obj):
        return obj.section.name

    class Meta:
        model = Knowledge
        fields = ['id', 'title', 'content', 'author', 'attach', 'section']



class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['section_id', 'name']
