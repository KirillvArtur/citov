# Generated by Django 3.2 on 2021-05-07 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base_radiostation', '0016_auto_20210507_1618'),
    ]

    operations = [
        migrations.AlterField(
            model_name='base_rs',
            name='lifetime',
            field=models.CharField(blank=True, max_length=100, verbose_name='Срок эксплуатации'),
        ),
    ]