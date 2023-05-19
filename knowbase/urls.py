from django.urls import path
from .views import KnowledgeViewSet

urlpatterns = [

    path('api/knowbase/', KnowledgeViewSet.as_view({'get': 'list'}), name='knowbase'),
]