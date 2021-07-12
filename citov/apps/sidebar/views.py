# from django.shortcuts import render, HttpResponse
#
# from .models import VerticalBar
#
#
# def left_menu(request):
#     left_menu = VerticalBar.objects.all()
#     context = {
#         "left_menu": left_menu,
#     }
#     return render(request, template_name="citov/inc/left_menu.html", context=context)
