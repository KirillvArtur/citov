from django.shortcuts import render
from django.http import HttpResponse

from citov.apps.news.models import *


def news(request):
    news = News.objects.all()
    context = {
        'news': news,
    }
    return render(request, template_name='citov/news.html', context=context)


def regulations(request):
    regulations = Regulations.objects.all()
    context = {
        'regulations': regulations,
    }
    return render(request, template_name='citov/regulations.html', context=context)

def orders(request):
    orders = Orders.objects.all()
    context = {
        'orders': orders,
    }
    return render(request, template_name='citov/orders.html', context=context)

def radmin(request):
    return render(request, template_name='citov/radmin.html')

def sempl(request):
    return render(request, template_name='citov/sempl.html')

def scanmyspeed(request):
    return render(request, template_name='citov/scanmyspeed.html')