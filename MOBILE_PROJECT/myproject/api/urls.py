from django.urls import path
from .views import *

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('enseignants/', EnseignantListView.as_view(), name='enseignant-list'),
    path('matieres/', MatiereListCreateView.as_view(), name='matiere-list-create'),
    path('matieres/<int:pk>/', MatiereDetailView.as_view(), name='matiere-detail'),


    path('classes/', ClasseListCreateView.as_view(), name='classe-list-create'),
    path('classes/<int:pk>/', ClasseDetailView.as_view(), name='classe-detail'),
    path('eleves/', ElevesListCreateView.as_view(), name='eleves-list-create'),
    path('eleves/<int:pk>/', ElevesDetailView.as_view(), name='eleves-detail'),


    path('notes/', NoteListCreateView.as_view(), name='note-list-create'),
    path('notes/<int:pk>/', NoteDetailView.as_view(), name='note-detail'),
    path('eleves/', EleveListView.as_view(), name='eleve-list'),
    path('eleves/<int:classe_id>/', EleveByClasseView.as_view(), name='eleve-by-classe'),
    path('notes/bulk/', BulkNoteCreateView.as_view(), name='bulk-note-create'),

    

    path('notes/<int:pk>/', NoteDetailView.as_view(), name='note-detail'),

    path('notes/bulk/update/<str:ids>/', BulkNoteUpdateByIDView.as_view(), name='bulk-note-update-by-id'),
    path('notes/bulk/delete/', BulkNoteDeleteView.as_view(), name='bulk-note-delete'),
]

