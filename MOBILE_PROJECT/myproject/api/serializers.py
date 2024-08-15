from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate
from .models import *

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'first_name',
            'last_name',
            'password',
            'password2'
        )
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(
        required=True,
        max_length=150,
        error_messages={
            'required': 'Le nom d\'utilisateur est obligatoire.',
            'max_length': 'Le nom d\'utilisateur ne peut pas dépasser 150 caractères.'
        }
    )
    password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'},
        error_messages={
            'required': 'Le mot de passe est obligatoire.'
        }
    )

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        if username and password:
            user = authenticate(username=username, password=password)
            if user is None:
                raise serializers.ValidationError('Identifiants incorrects.')
            if not user.is_active:
                raise serializers.ValidationError('Ce compte est inactif.')
        else:
            raise serializers.ValidationError('Les deux champs sont obligatoires.')
        data['user'] = user
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']
        
class InscriptionSerializer(serializers.ModelSerializer):
    id_classe = serializers.PrimaryKeyRelatedField(queryset=Classe.objects.all())

    class Meta:
        model = Eleves
        fields = ['id_eleve', 'id_classe', 'nom', 'prenom', 'addresse', 'date_nais', 'matricule']

    def validate_matricule(self, value):
        """
        Check if the matricule is unique. This check is done only if the instance is not being updated
        or if it's being updated with a different matricule.
        """
        instance = self.instance
        if instance and instance.matricule == value:
            return value
        if Eleves.objects.filter(matricule=value).exists():
            raise serializers.ValidationError("Le matricule est déjà utilisé.")
        return value

class EnseignantSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='id_user.first_name')
    last_name = serializers.CharField(source='id_user.last_name')

    class Meta:
        model = Enseignant
        fields = ['id_enseignant', 'first_name', 'last_name']

class MatiereSerializer(serializers.ModelSerializer):
    enseignant = EnseignantSerializer(source='id_enseignant', read_only=True)
    enseignant_id = serializers.PrimaryKeyRelatedField(
        queryset=Enseignant.objects.all(),
        source='id_enseignant',
        write_only=True
    )

    class Meta:
        model = Matiere
        fields = ['id_matiere', 'enseignant', 'enseignant_id', 'nom_matiere']

class ClasseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classe
        fields = ['id_classe', 'nom_classe', 'effectif_elelves']

class ElevesSerializer(serializers.ModelSerializer):
    moyenne = serializers.SerializerMethodField()
    classe = ClasseSerializer(source='id_classe', read_only=True)  # Read-only field for the class details

    class Meta:
        model = Eleves
        fields = ['id_eleve', 'nom', 'prenom', 'matricule', 'moyenne', 'classe', 'id_classe']  # Include id_classe

    def get_moyenne(self, obj):
        return obj.calculer_moyenne()

    def validate_matricule(self, value):
        instance = self.instance
        if instance and instance.matricule == value:
            return value
        if Eleves.objects.filter(matricule=value).exists():
            raise serializers.ValidationError("Le matricule est déjà utilisé.")
        return value




class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id_note', 'id_classe', 'id_eleve', 'id_matiere', 'note', 'date_debut', 'date_fin']

    def validate_note(self, value):
        """
        Vérifiez si la note est valide pour la matière spécifique.
        Vous pouvez ajouter des validations spécifiques ici.
        """
        # Par exemple : la note doit être entre 0 et 20
        if not (0 <= value <= 20):
            raise serializers.ValidationError("La note doit être entre 0 et 20.")
        return value