from django.db import models

class VerticalBar(models.Model):
    position = models.PositiveIntegerField('Позиция', default=1)
    name = models.CharField(max_length=200)
    url = models.CharField(max_length=200)

    def __int__(self):
        return self.name

    class Meta:
        ordering = ('position',)
        verbose_name = 'Элемент вертикального меню'
        verbose_name_plural = 'Элементы вертикального меню'

class MainHorizontalBar(models.Model):
    position = models.PositiveIntegerField('Позиция', default=2)
    name = models.CharField(max_length=200)
    url = models.CharField(max_length=200, blank=True)

    def __int__(self):
        return self.name

    class Meta:
        ordering = ('position',)
        verbose_name = 'Элемент горизонтального меню'
        verbose_name_plural = 'Элементы горизонтального меню'

class SubHorizontalBar(models.Model):
    position = models.PositiveIntegerField('Позиция', default=1)
    name = models.CharField(max_length=200)
    url = models.CharField(max_length=200)
    mainhorizontalbar = models.ForeignKey(MainHorizontalBar, on_delete=models.CASCADE, related_name='sub')

    def __int__(self):
        return "{} : {}".format(self.mainhorizontalbar, self.name)

    class Meta:
        verbose_name = 'Под элемент горизонтального меню'
        verbose_name_plural = 'Под элементы горизонтального меню'