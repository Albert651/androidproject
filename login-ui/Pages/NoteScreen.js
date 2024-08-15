import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput, ImageBackground, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assurez-vous d'avoir installé cette bibliothèque pour les icônes
import axios from 'axios';
import Toast from 'react-native-toast-message'; // Assurez-vous d'avoir installé cette bibliothèque pour les Toasts

const API_URL = 'http://192.168.88.197:8000/eleves/'; // Remplacez par l'URL de votre API

function NoteScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(''); // État pour le texte de recherche

  // Fonction pour récupérer les données
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      const filteredData = response.data.filter(eleve => eleve.moyenne > 0); // Filtrer les données
      setData(filteredData);
    } catch (error) {
      setError('Erreur lors de la récupération des élèves');
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erreur',
        text2: 'Erreur lors de la récupération des élèves',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer les données lorsque le composant est focalisé
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  // Filtrer les données en fonction du texte de recherche
  const filteredData = data.filter(item =>
    item.nom.toLowerCase().includes(search.toLowerCase()) ||
    item.prenom.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erreur : {error}</Text>
      </View>
    );
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}${id}/`);
      if (response.status === 204) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Succès',
          text2: 'L\'élève a été supprimé avec succès',
        });
        fetchData(); // Actualiser les données après la suppression
      } else {
        throw new Error('Échec de la suppression');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erreur',
        text2: error.message,
      });
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer cet élève ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'OK', onPress: () => handleDelete(id) },
      ],
      { cancelable: true }
    );
  };

  return (
    <ImageBackground
      source={require('../assests/images/fond.jpeg')} // Assurez-vous que le chemin est correct
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un élève..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id_eleve.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.nom} {item.prenom}</Text>
              <Text style={styles.cardSubtitle}>Matricule: {item.matricule}</Text>
              <Text style={styles.cardSubtitle}>Classe: {item.classe ? item.classe.nom_classe : 'N/A'}</Text>
              <Text style={styles.cardSubtitle}>Moyenne: {item.moyenne ? item.moyenne.toFixed(2) : 'N/A'}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={() => navigation.navigate('EditNoteScreen', { id: item.id_eleve })}
                >
                  <Icon name="edit" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => confirmDelete(item.id_eleve)}
                >
                  <Icon name="delete" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddNoteScreen')}
        >
          <Text style={styles.addButtonText}>Ajouter une Note</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3, // Pour ajouter une ombre sur Android
    shadowColor: '#000', // Pour ajouter une ombre sur iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#6200ea',
  },
  deleteButton: {
    backgroundColor: '#ff0000',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#6200ea',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  addButton: {
    backgroundColor: '#6200ea',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NoteScreen;






