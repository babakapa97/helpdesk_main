from elasticsearch_dsl import Document, Text, Keyword
from elasticsearch_dsl.connections import connections
from knowbase.models import Knowledge


# Устанавливаем подключение к Elasticsearch
connections.create_connection(hosts=['http://localhost:9200'])

# Определяем индекс Elasticsearch для модели Knowledge
class KnowledgeIndex(Document):
    title = Text()
    content = Text()
    section = Keyword()

    class Index:
        name = 'knowledge_base'

    @classmethod
    def index_all(cls):
        # Удаляем все существующие документы в индексе
        cls().init()

        # Индексируем все объекты модели Knowledge
        for knowledge in Knowledge.objects.all():
            cls().update(knowledge)

    def update(self, knowledge):
        self.meta.id = knowledge.id
        self.title = knowledge.title
        self.content = knowledge.content
        self.section = knowledge.section.name
        self.save()
