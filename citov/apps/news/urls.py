from django.urls import path
from .views import *

urlpatterns = [
    path('', news),
    path('regulations/', regulations),
    path('prikaz/', prikaz),
    path('radmin/', radmin),
    path('sempl/', sempl),
    path('scanmyspeed/', scanmyspeed),
]