from rest_framework import viewsets
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Knowledge
from .serializers import KnowledgeSerializer
from django.http import JsonResponse
# from search import search
from elasticsearch_dsl import Search
from search_indexes import KnowledgeIndex
# from elasticsearch import Elasticsearch
from django.db.models import Q

# # Создание экземпляра Elasticsearch
# es = Elasticsearch(['http://localhost:9200'])

#для просмотра деталей айтема
class KnowledgeDetail(RetrieveAPIView):
    queryset = Knowledge.objects.all()
    serializer_class = KnowledgeSerializer


class KnowledgeViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def list(self, request):
        section = request.query_params.get('section')
        search_query = request.query_params.get('search_query')

        queryset = Knowledge.objects.all()

        # Фильтрация по разделу, если передан параметр "section"
        if section:
            queryset = queryset.filter(section=section)

        # Поиск по дополнительным полям, если передан параметр "search_query"
        if search_query:
            search_words = search_query.split()  # Разделение строки на отдельные слова
            search_conditions = Q()

            for word in search_words:
                search_conditions &= Q(title__icontains=word) | Q(content__icontains=word)
                # Добавьте здесь другие поля для поиска

            queryset = queryset.filter(search_conditions)

        serializer = KnowledgeSerializer(queryset, many=True, context={'request': request})
        data = serializer.data

        for idx, knowledge_data in enumerate(data):
            knowledge_data['id'] = queryset[idx].id

        return Response(data)

def knowledge_base_search(request):
    query = request.GET.get('q', '')

    # Открытие индекса
    es.indices.open(index='knowledge_base')

    # Создаем поисковый запрос Elasticsearch DSL
    search = Search(index='knowledge_base')
    search = search.query('multi_match', query=query, fields=['title', 'content'])

    # Получаем результаты поиска
    response = search.execute()

    # Обрабатываем результаты
    results = []
    for hit in response:
        knowledge = Knowledge.objects.get(pk=hit.meta.id)
        result = {
            'id': knowledge.id,
            'title': knowledge.title,
            'content': knowledge.content,
            'section': knowledge.section.name,
        }
        results.append(result)

    # Возвращаем результаты в формате JSON или другом формате, в зависимости от вашего API
    return JsonResponse({'results': results})