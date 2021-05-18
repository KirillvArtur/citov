from django.contrib import admin
from .models import *

class VerticalBarAdmin(admin.ModelAdmin):

    list_display = ('position', 'name', 'url')

class SubHorizontalBar(admin.TabularInline):

    model = SubHorizontalBar

class MainHorizontalBarAdmin(admin.ModelAdmin):

    list_display = ('position', 'name', 'url')
    inlines = [
        SubHorizontalBar,
    ]





admin.site.register(VertiсalBar, VerticalBarAdmin)
admin.site.register(MainHorizontalBar, MainHorizontalBarAdmin)
