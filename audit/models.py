from django.db import models
from django.conf import settings


class HardwareType(models.Model):
    type_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=False)

    def __str__(self):
        return self.name


class Hardware(models.Model):
    name = models.CharField(max_length=100, blank=False)
    type = models.ForeignKey(HardwareType, on_delete=models.DO_NOTHING)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING,
                               verbose_name='Владелец', related_name='owner')

    def __str__(self):
        return self.name

