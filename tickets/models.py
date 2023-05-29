from django.db import models
from django.conf import settings


class Status(models.Model):
    status_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name


class Ticket(models.Model):
    title = models.CharField(max_length=100, blank=False)
    description = models.TextField()
    status = models.ForeignKey(Status, on_delete=models.DO_NOTHING)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING,
                               verbose_name='Автор', related_name='ticket_authors', null=True, blank=True, unique=False)
    agent = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True,
                              verbose_name='Назначен', related_name='agents', blank=True)
    attach = models.FileField(upload_to='files/attach_tickets/%Y-%m-%d/', null=True, blank=True)
    # attach = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    content = models.TextField(max_length=500, blank=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING,
                               verbose_name='Автор', related_name='comment_authors', unique=False)
    ticket_id = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content