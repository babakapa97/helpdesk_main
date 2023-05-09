from django.urls import path
from .views import category_list, status_list, create_ticket

urlpatterns = [

    path('api/categories/', category_list, name='category_list'),
    path('api/status/', status_list, name='status_list'),
    path('api/tickets/create', create_ticket, name='create_ticket'),

]
