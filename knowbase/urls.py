from django.urls import path
from .views import KnowledgeViewSet, knowledge_base_search, KnowledgeDetail

urlpatterns = [

    path('api/knowbase/', KnowledgeViewSet.as_view({'get': 'list'}), name='knowbase'),
    path('api/knowbase/<int:pk>/',KnowledgeDetail.as_view(), name='knowbase_detail'),
    path('api/knowbase/search/', knowledge_base_search, name='knowbase_search'),

]


