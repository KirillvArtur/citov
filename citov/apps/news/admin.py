from django.contrib import admin
from .models import News, Regulations

class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')

class RegulationsAdmin(admin.ModelAdmin):
    list_display = ('id', 'number', 'date', 'post', 'title')
    list_display_links = ('number',)


admin.site.register(News, NewsAdmin)
admin.site.register(Regulations, RegulationsAdmin)

