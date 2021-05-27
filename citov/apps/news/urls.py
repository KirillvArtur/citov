from django.urls import path
from .views import *


urlpatterns = [
    path('', news, name='home'),
    path('regulations/', regulations, name='regulations'),
    path('orders/', orders, name='orders'),
    path('radmin/', radmin, name='radmin'),
    path('sempl/', sempl, name='sempl'),
    path('scanmyspeed/', scanmyspeed, name='scanmyspeed'),
]