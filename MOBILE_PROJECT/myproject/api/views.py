from rest_framework import generics
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Enseignant, Matiere, Classe, Eleves
from .serializers import *

class BaseListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        classe = serializer.validated_data['id_classe']
        classe.effectif_elelves += 1
        classe.save()
        serializer.save()

class BaseDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]

    def perform_destroy(self, instance):
        classe = instance.id_classe
        classe.effectif_elelves -= 1
        classe.save()
        instance.delete()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({"error": "Invalid credentials"}, status=400)

class EnseignantListView(generics.ListAPIView):
    queryset = Enseignant.objects.all()
    serializer_class = EnseignantSerializer
    permission_classes = [AllowAny]

class MatiereListCreateView(generics.ListCreateAPIView):
    queryset = Matiere.objects.all()
    serializer_class = MatiereSerializer
    permission_classes = [AllowAny]

class MatiereDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Matiere.objects.all()
    serializer_class = MatiereSerializer
    permission_classes = [AllowAny]

class ClasseListCreateView(generics.ListCreateAPIView):
    queryset = Classe.objects.all()
    serializer_class = ClasseSerializer
    permission_classes = [AllowAny]

class ClasseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Classe.objects.all()
    serializer_class = ClasseSerializer
    permission_classes = [AllowAny]

class ElevesListCreateView(generics.ListCreateAPIView):
    queryset = Eleves.objects.all()
    serializer_class = ElevesSerializer
    permission_classes = [AllowAny]  # Pour des tests rapides

    def perform_create(self, serializer):
        classe = serializer.validated_data['id_classe']
        classe.effectif_elelves += 1
        classe.save()
        serializer.save()

class ElevesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Eleves.objects.all()
    serializer_class = ElevesSerializer
    permission_classes = [AllowAny]  # Pour des tests rapides

    def perform_destroy(self, instance):
        classe = instance.id_classe
        classe.effectif_elelves -= 1
        classe.save()
        instance.delete()

class EleveListView(generics.ListCreateAPIView):
    queryset = Eleves.objects.all()
    serializer_class = ElevesSerializer
    permission_classes = [AllowAny]


class EleveByClasseView(generics.ListAPIView):
    serializer_class = ElevesSerializer

    def get_queryset(self):
        classe_id = self.kwargs['classe_id']
        return Eleves.objects.filter(id_classe=classe_id)



class ElevesMoyenneListView(generics.ListAPIView):
    queryset = Eleves.objects.all()
    serializer_class = ElevesSerializer
    permission_classes = [AllowAny]


class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [AllowAny]

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [AllowAny]



class BulkNoteCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        notes_data = request.data
        serializer = NoteSerializer(data=notes_data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BulkNoteUpdateByIDView(APIView):
    permission_classes = [AllowAny]

    def put(self, request, *args, **kwargs):
        ids = self.kwargs.get('ids').split(',')
        notes_data = request.data
        updated_notes = []
        errors = []

        for note_data in notes_data:
            note_id = note_data.get('id_note')
            if note_id and str(note_id) in ids:
                try:
                    note = Note.objects.get(id_note=note_id)
                    serializer = NoteSerializer(note, data=note_data, partial=True)
                    if serializer.is_valid():
                        serializer.save()
                        updated_notes.append(serializer.data)
                    else:
                        errors.append(serializer.errors)
                except Note.DoesNotExist:
                    errors.append({"error": f"Note with ID {note_id} not found"})
            else:
                errors.append({"error": f"ID {note_id} not in the provided IDs list"})

        if errors:
            return Response({"updated": updated_notes, "errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"updated": updated_notes}, status=status.HTTP_200_OK)



class BulkNoteDeleteView(APIView):
    permission_classes = [AllowAny]

    def delete(self, request, *args, **kwargs):
        note_ids = request.data.get('id_notes', [])
        deleted_count = 0
        for note_id in note_ids:
            try:
                note = Note.objects.get(id_note=note_id)
                note.delete()
                deleted_count += 1
            except Note.DoesNotExist:
                continue
        return Response({'status': f'{deleted_count} notes deleted'}, status=status.HTTP_200_OK)

class InscriptionDetailView(BaseDetailView):
    queryset = Eleves.objects.all()
    serializer_class = ElevesSerializer


