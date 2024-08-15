from django.db import models
from django.contrib.auth.models import User
from django.db.models import Avg


class Enseignant(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)  # Utilise la clé étrangère vers User
    id_enseignant = models.AutoField(primary_key=True)  # Clé primaire pour Enseignant, séparée de User

    class Meta:
        verbose_name = 'Enseignant'
        verbose_name_plural = 'Enseignants'

class Matiere(models.Model):
    id_matiere = models.AutoField(primary_key=True)
    id_enseignant = models.ForeignKey(Enseignant, on_delete=models.CASCADE)
    nom_matiere = models.CharField(max_length=100)

    def __str__(self):
        return self.nom_matiere

class Classe(models.Model):
    id_classe = models.AutoField(primary_key=True)
    nom_classe = models.CharField(max_length=255)
    effectif_elelves = models.PositiveIntegerField(default=0)  # Valeur par défaut de 0

    def __str__(self):
        return self.nom_classe

class Eleves(models.Model):
    id_eleve = models.AutoField(primary_key=True)
    id_classe = models.ForeignKey(Classe, on_delete=models.CASCADE, related_name='eleves')
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    addresse = models.TextField()
    date_nais = models.DateField()
    matricule = models.CharField(max_length=255, unique=True)  # Assurez-vous que ce champ est unique au niveau de la base de données

    def __str__(self):
        return f"{self.prenom} {self.nom}"
    
    def calculer_moyenne(self):
        notes = Note.objects.filter(id_eleve=self)
        moyenne = notes.aggregate(moyenne=Avg('note'))['moyenne']
        return moyenne if moyenne is not None else 0 


class Note(models.Model):
    id_note = models.AutoField(primary_key=True)
    id_classe = models.ForeignKey(Classe, on_delete=models.CASCADE)
    id_eleve = models.ForeignKey(Eleves, on_delete=models.CASCADE)
    id_matiere = models.ForeignKey(Matiere, on_delete=models.CASCADE)
    note = models.DecimalField(max_digits=5, decimal_places=2)
    date_debut = models.DateField()
    date_fin = models.DateField()

    def __str__(self):
        return f"Note {self.id_note} - {self.id_eleve.nom} - {self.id_matiere.nom_matiere}"

