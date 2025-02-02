from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Enseignant

@receiver(post_save, sender=User)
def create_enseignant(sender, instance, created, **kwargs):
    if created:
        Enseignant.objects.create(id_user=instance)
