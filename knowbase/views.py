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
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = Knowledge.objects.all()
        serializer = KnowledgeSerializer(queryset, many=True, context={'request': request})
        data = serializer.data
        for idx, knowledge_data in enumerate(data):
            knowledge_data['id'] = queryset[idx].id
        return Response(data)