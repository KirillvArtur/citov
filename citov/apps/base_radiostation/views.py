from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponseNotFound

from .models import Radiostations, Institutions

def reestr(request):
    radiostations = Radiostations.objects.all()
    institutions = Institutions.objects.all()
    context = {
        'radiostations': radiostations,
        'title': 'Список радиостанций',
        'institutions': institutions,
    }
    return render(request, template_name='base/reestr.html', context=context)

def get_institution(request, slug):
    radiostations = Radiostations.objects.filter(institution__slug =slug)
    institutions = Institutions.objects.all()
    institution = Institutions.objects.get(slug=slug)
    context = {
        'radiostations': radiostations,
        'institutions': institutions,
        'institution': institution,
    }
    return render(request, template_name='base/reestr_inst.html', context=context)



