# Generated by Django 3.2 on 2021-05-11 08:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base_radiostation', '0021_alter_base_rs_date_to_work'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='base_rs',
            name='lifetime',
        ),
    ]