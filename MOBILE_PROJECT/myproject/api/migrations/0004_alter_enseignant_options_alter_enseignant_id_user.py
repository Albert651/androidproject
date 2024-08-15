# Generated by Django 4.2.5 on 2024-08-07 05:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0003_remove_enseignant_matière'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='enseignant',
            options={'verbose_name': 'Enseignant', 'verbose_name_plural': 'Enseignants'},
        ),
        migrations.AlterField(
            model_name='enseignant',
            name='id_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
