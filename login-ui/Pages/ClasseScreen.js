import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, TextInput, ImageBackground } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Importer les icônes
import Toast from 'react-native-toast-message'; // Assurez-vous que vous avez installé et configuré cette bibliothèque

function ClasseScreen({ navigation }) {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://192.168.88.197:8000/classes/');
      setClasses(response.data);
      setFilteredClasses(response.data);
      setLoading(false);
    } catch (error) {
      setError('Erreur lors du chargement des données');
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchClasses();
    }, [])
  );

  useEffect(() => {
    if (searchText) {
      const filtered = classes.filter(item =>
        item.nom_classe.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses(classes);
    }
  }, [searchText, classes]);

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer cet élément ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.88.197:8000/classes/${id}/`);
              setClasses(classes.filter(item => item.id_classe !== id));
              setFilteredClasses(filteredClasses.filter(item => item.id_classe !== id));
              Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Classe supprimée',
                text2: 'La classe a été supprimée avec succès.',
              });
            } catch (error) {
              console.error('Erreur lors de la suppression des données:', error); // Log d'erreur pour débogage
              setError('Erreur lors de la suppression des données');
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erreur',
                text2: 'La suppression a échoué.',
              });
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleEdit = (id) => {
    navigation.navigate('EditClassScreen', { id });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ea" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ImageBackground
      source={require('../assests/images/fond.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('DetailsScreen')}
        >
          <MaterialIcons name="arrow-back" size={24} color="#6200ea" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une classe..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.listContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Classe</Text>
            <Text style={styles.headerText}>Effectif</Text>
            <Text style={styles.headerText}>Actions</Text>
          </View>
          <FlatList
            data={filteredClasses}
            keyExtractor={(item) => item.id_classe.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.nom_classe}</Text>
                <Text style={styles.itemText}>{item.effectif_elelves}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => handleEdit(item.id_classe)}
                  >
                    <MaterialIcons name="edit" size={24} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => handleDelete(item.id_classe)}
                  >
                    <MaterialIcons name="delete" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddClassScreen')}
          >
            <Text style={styles.addButtonText}>Ajouter une Classe</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  backButton: {
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
  listContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    color: '#000',
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
    color: '#fff',
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  addButtonContainer: {
    marginTop: 16,
  },
  addButton: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ClasseScreen;
