from elasticsearch import Elasticsearch

# Создаем подключение к Elasticsearch
es = Elasticsearch(['http://localhost:9200'])

# Открытие индекса
es.indices.open(index='knowledge_base')

# Поиск по индексу "knowledge_base"
result = es.search(index='knowledge_base', body={'query': {'match': {'content': query}}})

# Обработка результатов и возврат их
hits = result['hits']['hits']
search_results = []
for hit in hits:
    knowledge_id = hit['_id']
    knowledge_title = hit['_source']['title']
    knowledge_content = hit['_source']['content']
    knowledge_section = hit['_source']['section']
    search_result = {
        'id': knowledge_id,
        'title': knowledge_title,
        'content': knowledge_content,
        'section': knowledge_section
    }
    search_results.append(search_result)