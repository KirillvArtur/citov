from django.shortcuts import render
from django.http import HttpResponse

from .models import Base

def reestr(request):
    base = Base.objects.all()
    context = {
        'base': base,
        'title': 'Список радиостанций'
    }
    return render(request, template_name='base/reestr.html', context=context)