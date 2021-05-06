from django.shortcuts import render
from django.http import HttpResponse

from .models import Base_rs, Institutions

def reestr(request):
    base = Base_rs.objects.all()
    institutions = Institutions.objects.all()
    context = {
        'base': base,
        'title': 'Список радиостанций',
        'institutions': institutions,
    }
    return render(request, template_name='base/reestr.html', context=context)

def get_institution(request, institution_id):
    base = Base_rs.objects.filter(institution_id=institution_id)
    institutions = Institutions.objects.all()
    institution = Institutions.objects.get(pk=institution_id)
    return render(request, template_name='base/reestr_inst.html', context={'base': base, 'institutions': institutions, 'institution': institution})
