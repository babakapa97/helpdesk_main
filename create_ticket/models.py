from django.db import models
from django.conf import settings


# class Status(models.Model):
#     status_id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=20)
#
#     def __str__(self):
#         return self.name
#
#
# class Category(models.Model):
#     category_id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=25)
#
#     def __str__(self):
#         return self.name


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
    # status_id = models.ForeignKey(Status, on_delete=models.DO_NOTHING)
    category_choices = [
        ('oscod', 'Пользователи AD, Медпочты'),
        ('secure', 'VipNet, защищенная сеть'),
        ('is', 'Информационные системы')]

    category = models.CharField(max_length=25, choices=category_choices)
    # category_id = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, verbose_name='Автор', related_name ='authors')
    agent = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, verbose_name='Назначен', related_name ='agents', blank=True)
    attach = models.FileField(upload_to='files/attach_tickets/%Y-%m-%d/', null=True, blank=True)

    def __str__(self):
        return self.title

