from django.urls import path
from .views import HardwareCreateView


urlpatterns = [
    path('api/audit/', HardwareCreateView.as_view(), name='hardware-create'),
    path('api/audit/', HardwareCreateView.as_view(), name='hardware-list'),
]

