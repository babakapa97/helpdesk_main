from rest_framework import viewsets
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Knowledge
from .serializers import KnowledgeSerializer


#для просмотра деталей айтема
class KnowledgeDetail(RetrieveAPIView):
    queryset = Knowledge.objects.all()
    serializer_class = KnowledgeSerializer


class KnowledgeViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def list(self, request):
        section = request.query_params.get('section')  # Получаем значение параметра "section" из запроса
        queryset = Knowledge.objects.all()
        
        if section:
            queryset = queryset.filter(section=section)  # Фильтрация по разделу, если передан параметр "section"
        
        serializer = KnowledgeSerializer(queryset, many=True, context={'request': request})
        data = serializer.data
        for idx, knowledge_data in enumerate(data):
            knowledge_data['id'] = queryset[idx].id
        return Response(data)
