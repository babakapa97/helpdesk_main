from django.db import models
from django.conf import settings


class Hardware(models.Model):
    computer_name = models.CharField(max_length=10, blank=False, unique=True)
    processor_info = models.CharField(max_length=100)
    memory_info = models.CharField(max_length=50)
    monitor_info = models.CharField(max_length=150)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING,
                               verbose_name='Владелец', related_name='owner', null=True, blank=True)

    def __str__(self):
        return self.name

