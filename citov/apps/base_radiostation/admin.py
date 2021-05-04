from django.contrib import admin
from .models import *

class BaseAdmin(admin.ModelAdmin):
    list_display = ('id', 'institution', 'inventory_number', 'serial_number', 'model_name', 'category')
    list_display_links = ('id', 'serial_number')
    search_fields = (
        'institution__name',
        'inventory_number',
        'serial_number',
        'model_name__name',
        'model_name__type_rs',
        'category',
    )

class InstitutionsAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')

class Model_nameAdmin(admin.ModelAdmin):
    list_display = ('type_rs', 'name')


admin.site.register(Institutions, InstitutionsAdmin)
admin.site.register(Models_name, Model_nameAdmin)
admin.site.register(Base, BaseAdmin)

