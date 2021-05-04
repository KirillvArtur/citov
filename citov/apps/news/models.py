from django.urls import path
from django.http import response
from django.db import models

def content_file_name(instance, filename):
    return 'GK/gk_ot_{date}_{number}.pdf'.format(date=instance.date, number=instance.number)

class News(models.Model):
    title = models.CharField(max_length=50, verbose_name='Заголовок')
    news_text = models.TextField(verbose_name='Текст новости')
    date = models.DateField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'


class Regulations(models.Model):
    title = models.CharField(max_length=255, verbose_name='Описание')
    date = models.DateField(verbose_name='Дата ГК')
    number = models.CharField(max_length=10, verbose_name='Номер ГК')
    upload = models.FileField(upload_to=content_file_name, verbose_name='Pdf')
    post = models.CharField(max_length=50, verbose_name='Поставщик')

    class Meta:
        verbose_name = 'Государственный контракт'
        verbose_name_plural = 'Государственные контракты'