import os

# Установка переменной среды DJANGO_SETTINGS_MODULE
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# Настройка Django
import django
django.setup()

from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
from knowbase.models import Knowledge

def create_knowledge_base_index():
    es = Elasticsearch(['http://localhost:9200'])

    # Определение настроек и маппинга индекса
    index_settings = {
        'settings': {
            'number_of_shards': 1,
            'number_of_replicas': 0
        },
        'mappings': {
            'properties': {
                'title': {'type': 'text'},
                'content': {'type': 'text'},
                'section': {'type': 'keyword'}
            }
        }
    }

    # Создание индекса
    es.indices.create(index='knowledge_base', body=index_settings)

    # Получение данных из базы данных
    queryset = Knowledge.objects.all()

    # Индексация данных в Elasticsearch
    actions = [
        {
            '_index': 'knowledge_base',
            '_id': knowledge.id,
            '_source': {
                'title': knowledge.title,
                'content': knowledge.content,
                'section': knowledge.section.name
            }
        }
        for knowledge in queryset
    ]
    bulk(es, actions)


def search(query):
    es = Elasticsearch(['localhost'], port=9200)

    # Открытие индекса
    es.indices.open(index='knowledge_base')

    # Поиск по индексу "knowledge_base"
    result = es.search(index='knowledge_base', body={'query': {'match': {'content': query}}})

    # Обработка результатов и возврат их

# Вызов функции для создания индекса и индексации данных
create_knowledge_base_index()
