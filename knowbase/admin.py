from django.contrib import admin
from .models import Knowledge, Section


class SectionAdmin(admin.ModelAdmin):
    list_display = ('section_id', 'name')


def get_form(self, request, obj=None, change=False, **kwargs):
    form = super(SectionAdmin, self).get_form(request, obj, **kwargs)
    return form


class KnowledgeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'content', 'section', 'attach', 'author')
    autocomplete_fields = ('author',)

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = super(KnowledgeAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['author'].initial = request.user

        if str(request.user) != 'superuser':
            form.base_fields['author'].disabled = request.user

        return form


admin.site.register(Section, SectionAdmin)
admin.site.register(Knowledge, KnowledgeAdmin)
