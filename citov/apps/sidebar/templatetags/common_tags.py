from django import template
from citov.apps.sidebar.models import VerticalBar
register = template.Library()

@register.inclusion_tag('citov/inc/left_menu.html', takes_context=True)
def show_left_menu(context):
    left_menu = VerticalBar.objects.all()
    return {
        'left_menu': left_menu
    }
