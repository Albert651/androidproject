# Generated by Django 4.2.5 on 2024-08-08 08:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_classe'),
    ]

    operations = [
        migrations.CreateModel(
            name='Eleves',
            fields=[
                ('id_eleve', models.AutoField(primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=255)),
                ('prenom', models.CharField(max_length=255)),
                ('addresse', models.TextField()),
                ('date_nais', models.DateField()),
                ('matricule', models.CharField(max_length=255)),
                ('classe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='eleves', to='api.classe')),
            ],
        ),
    ]
