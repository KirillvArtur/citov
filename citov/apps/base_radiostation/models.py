import datetime, pytz
from django.db import models
from django.utils import timezone
from django.urls import reverse
from dateutil.relativedelta import relativedelta

class Institutions(models.Model):
    name = models.CharField(max_length=255, verbose_name='Краткое наименование учреждения',
                            help_text="Формат ввода ИК/УК/КП/СИЗО/ЛИУ-ХХ")
    slug = models.SlugField(verbose_name='URL учреждения', unique=True)

    def get_absolute_url(self):
        return reverse('institution', kwargs={'slug':self.slug})

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Учреждение'
        verbose_name_plural = 'Учреждения'
        ordering = ['name']

class Models_name(models.Model):
    TYPE_NOSIM = 'Носимая'
    TYPE_MOBILE = 'Мобильная'
    TYPE_STATIONARY = 'Стационарная'

    TYPE_RS = (
        (TYPE_NOSIM, 'Носимая'),
        (TYPE_MOBILE, 'Мобильная'),
        (TYPE_STATIONARY, 'Стационарная')
    )

    name = models.CharField(max_length=100, verbose_name='Наименование РС', unique=True)
    type_rs = models.CharField(max_length=100, verbose_name='Тип РС', choices=TYPE_RS)

    def __str__(self):
        return "{} радиостанция {}".format(self.type_rs, self.name)

    class Meta:
        verbose_name = 'Модель радиостанции'
        verbose_name_plural = 'Модели радиостанций'
        ordering = ['type_rs', 'name']

class Radiostations(models.Model):
    THE_FIRST = 'first'
    THE_SECOND = 'second'
    THE_THIRD = 'third'
    THE_FOURTH = 'fourth'

    CATEGORY_RS = (
        (THE_FIRST, 'Первая'),
        (THE_SECOND, 'Вторая'),
        (THE_THIRD, 'Третья'),
        (THE_FOURTH, 'Четвертая'),
    )

    SECURITY = 'security'
    SAFETY = 'sefety'
    LZU = 'lzu'
    OP4 = 'op4'
    WAREHOUSE = 'warehouse'
    GBR = 'gbr'
    OTHER = 'other'

    PLACE_OF_OPERATION = (
        (SECURITY, 'Применяется в организации связи подразделений охраны и конвоирования'),
        (SAFETY, 'Применяется в организации связи подразделений режима и надзора (безопасности)'),
        (LZU, 'Применяется в организации связи на лесозаготовительных участках'),
        (OP4, 'Применяется в организации связи службы ОПЧ'),
        (WAREHOUSE, 'Хранится на складе учреждения'),
        (GBR, 'Группа быстрого реагирования'),
        (OTHER, 'Иное не включенное в другие группы'),
    )

    def lifetime(self):
        dt_now = datetime.datetime.now()
        return '{} лет'.format(relativedelta(dt_now, self.date_to_work).years)

    institution = models.ForeignKey(Institutions, verbose_name='Учреждение', on_delete=models.PROTECT)
    inventory_number = models.CharField(max_length=30, verbose_name='Инвентарный номер')
    serial_number = models.CharField(max_length=30, verbose_name='Серийный номер', db_index=True)
    model_name = models.ForeignKey(Models_name, verbose_name='Наименование РС', on_delete=models.PROTECT)
    category = models.CharField(max_length=10, verbose_name='Категория РС', choices=CATEGORY_RS, default=THE_FIRST)
    production_year = models.CharField(max_length=4, verbose_name='Год выпуска РС',
                                       help_text="Формат ввода <em>ГГГГ</em>")
    date_to_work = models.DateField(verbose_name='Дата ввода в эксплуатацию')
    order = models.CharField(max_length=100, verbose_name='Приказ о закреплении',
                             help_text="формат ввода <em>№ XX от ДД.MM.ГГГГ</em>")
    place_of_opeation = models.CharField(max_length=250, verbose_name='Место эксплуатации оборудования',
                                         choices=PLACE_OF_OPERATION)
    photo = models.ImageField(upload_to='photos_rs/', verbose_name='Фотография РС', blank=True)
    comment = models.CharField(max_length=50, verbose_name='Комментарии', blank=True)

    def __str__(self):
        return "{} № {}".format(self.model_name, self.serial_number)

    class Meta:
        verbose_name = 'Радиостанция'
        verbose_name_plural = 'Радиостанции'
        ordering = ['institution']


