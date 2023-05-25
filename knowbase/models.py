from django.db import models
from django.conf import settings


class Section(models.Model):
    section_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name


class Knowledge(models.Model):
    title = models.CharField(max_length=100, blank=False)
    content = models.TextField()
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    attach = attach = models.FileField(upload_to='files/attach_faq/%Y-%m-%d/', null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING,
                               verbose_name='Автор', related_name='knowledge_authors', blank=True, null=True)

    def __str__(self):
        return self.title
