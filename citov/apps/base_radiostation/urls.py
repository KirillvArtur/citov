from django.urls import path
from .views import *

urlpatterns = [
    path('', reestr, name='reestr'),
    path('<int:institution_id>/', get_institution, name='institution'),
]
