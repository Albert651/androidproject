# Generated by Django 4.2.5 on 2024-08-08 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_rename_classe_eleves_id_classe'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classe',
            name='effectif_elelves',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
