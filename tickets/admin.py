
from django.contrib import admin
from .models import Ticket, Category, Status


class StatusAdmin(admin.ModelAdmin):
    list_display = ('status_id', 'name')

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = super(StatusAdmin, self).get_form(request, obj, **kwargs)
        return form


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_id', 'name')

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = super(CategoryAdmin, self).get_form(request, obj, **kwargs)
        return form


class TicketAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'status', 'category', 'created_at', 'updated_at', 'author', 'agent')
    list_display_links = ('id', 'title')
    search_fields = ('id', 'title', 'create_at')
    list_editable = ('status',)
    list_filter = ('status', 'category', 'author', 'agent')
    autocomplete_fields = ('author',)

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = super(TicketAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['author'].initial = request.user

        if str(request.user) != 'superuser':
            form.base_fields['author'].disabled = request.user

        return form


admin.site.register(Ticket, TicketAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Status, StatusAdmin)
