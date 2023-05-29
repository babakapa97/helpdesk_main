from django.urls import path
from .views import category_list, status_list, TicketCreateView, TicketViewSet, TicketDetailView, get_ticket_comments

urlpatterns = [

    path('api/tickets/', TicketViewSet.as_view({'get': 'list'}), name='ticket'),
    path('api/tickets/<int:pk>/', TicketDetailView.as_view(), name='ticket_detail'),
    path('api/categories/', category_list, name='category_list'),
    path('api/status/', status_list, name='status_list'),
    path('api/tickets/create/', TicketCreateView.as_view(), name='create_ticket'),
    path('api/tickets/<ticket_id>/comments/', get_ticket_comments, name='ticket_comment')
]
