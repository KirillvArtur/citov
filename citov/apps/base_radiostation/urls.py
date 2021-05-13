from django.urls import path
from .views import *

urlpatterns = [
    path('', reestr, name='reestr'),
    path('<slug:slug>/', get_institution, name='institution'),
]
