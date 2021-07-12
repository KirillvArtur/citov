from django import template
from citov.apps.sidebar.models import VerticalBar, MainHorizontalBar, SubHorizontalBar
register = template.Library()

@register.inclusion_tag('citov/inc/left_menu.html', takes_context=True)
def show_left_menu(context):
    left_menu = VerticalBar.objects.all()
    last = len(left_menu)
    return {
        'left_menu': left_menu,
        'last': last,
    }

@register.inclusion_tag('citov/inc/sidebar.html', takes_context=True)
def show_sidebar(context):
    sidebar = MainHorizontalBar.objects.all()
    last = len(sidebar)+1
    return {
        'sidebar': sidebar,
        'last': last,
    }