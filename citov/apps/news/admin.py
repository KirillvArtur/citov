from django.contrib import admin
from .models import News, Regulations, Orders

class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')

class RegulationsAdmin(admin.ModelAdmin):
    list_display = ('id', 'number', 'date', 'post', 'title')
    list_display_links = ('number',)

class OrdersAdmin(admin.ModelAdmin):
    list_display = ('id', 'number', 'date', 'title')
    list_display_links = ('number',)

admin.site.register(News, NewsAdmin)
admin.site.register(Regulations, RegulationsAdmin)
admin.site.register(Orders, OrdersAdmin)

