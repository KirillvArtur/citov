from django.apps import AppConfig


class BaseRadiostationConfig(AppConfig):
    default_auto_field = 'django.db.models.AutoField'
    name = 'base_radiostation'
    verbose_name = 'Реестр радиостанций'
