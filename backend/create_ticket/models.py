from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=20)
    mid_name = models.CharField(max_length=20)
    login = models.CharField(max_length=15)
    password = models.CharField(max_length=8)
    is_admin = models.BooleanField(default=False)


class Ticket(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    status_choices = [
        ('new', 'Новая'),
        ('in_progress', 'В работе'),
        ('wait', 'Ожидающая ответа'),
        ('closed', 'Решена'),
    ]
    status = models.CharField(max_length=20, choices=status_choices, default="Новая")
    category_choices = [
        ('oscod', 'Пользователи AD, Медпочты'),
        ('secure', 'VipNet, защищенная сеть'),
        ('is', 'Информационные системы')
    ]
    category = models.CharField(max_length=25, choices=category_choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='create_ticket.Ticket.author+')
    agent = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='create_ticket.Ticket.agent+')
    attach = models.FileField(upload_to='files/attach_tickets/%Y-%m-%d/')
