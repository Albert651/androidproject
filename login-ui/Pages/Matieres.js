import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importer les icônes
import Toast from 'react-native-toast-message'; // Importer Toast

const API_URL = 'http://192.168.88.197:8000/matieres/'; // Remplacez par l'URL de votre API

function MatiereList({ route, navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(''); // État pour le texte de recherche

  // Fonction pour récupérer les données
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Cache-Control': 'no-cache', // Ajouter cet en-tête
        },
      });
      if (!response.ok) {
        throw new Error('La réponse du réseau n\'était pas correcte');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer les données lorsque le composant est focalisé ou lorsque route.params.refresh change
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData, route.params?.refresh])
  );

  // Fonction pour gérer la suppression
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Échec de la suppression');
      }
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Succès',
        text2: 'La matière a été supprimée avec succès.',
      });
      fetchData(); // Actualiser les données après la suppression
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erreur',
        text2: `Erreur lors de la suppression : ${error.message}`,
      });
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer cette matière ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'OK', onPress: () => handleDelete(id) },
      ],
      { cancelable: true }
    );
  };

  // Filtrer les données en fonction du texte de recherche
  const filteredData = data.filter(item =>
    item.nom_matiere.toLowerCase().includes(search.toLowerCase()) ||
    (item.enseignant &&
      `${item.enseignant.first_name} ${item.enseignant.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <View style={styles.loading}>
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
            placeholder="Rechercher..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Nom</Text>
          <Text style={styles.headerText}>Professeur</Text>
          <Text style={styles.headerText}>Action</Text>
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id_matiere.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.nom_matiere}</Text>
              <Text style={styles.itemText}>
                {item.enseignant ? `${item.enseignant.first_name} ${item.enseignant.last_name}` : 'N/A'}
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={() => navigation.navigate('EditMatiere', { id_matiere: item.id_matiere })}
                >
                  <Icon name="edit" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => confirmDelete(item.id_matiere)}
                >
                  <Icon name="delete" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddMatiere')}
        >
          <Text style={styles.addButtonText}>Ajouter une Matière</Text>
        </TouchableOpacity>
      </View>
      {/* Ajouter Toast */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
  headerContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    color: '#000', // Changer la couleur du texte en noir
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    flex: 1,
    color: '#fff', // Changer la couleur du texte en blanc
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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

export default MatiereList;

