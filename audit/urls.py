from django.urls import path
from .views import HardwareViewSet

urlpatterns = [

    path('api/audit/', HardwareViewSet.as_view({'get': 'list'}), name='hardware'),
]
