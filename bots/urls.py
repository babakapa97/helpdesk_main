from django.urls import path
from .views import generate_api_key

urlpatterns = [
path('api/generate-key/', generate_api_key, name='generate_api_key'),
]