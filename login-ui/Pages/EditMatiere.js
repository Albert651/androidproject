import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';

const API_URL = 'http://192.168.88.197:8000/'; // Remplacez par l'URL de votre API

function EditMatiere({ route, navigation }) {
  const { id_matiere } = route.params; // Récupère l'ID de la matière à modifier
  const [enseignants, setEnseignants] = useState([]);
  const [selectedEnseignantId, setSelectedEnseignantId] = useState('');
  const [nomMatiere, setNomMatiere] = useState('');
  const [loading, setLoading] = useState(true);

  // Récupérer les enseignants depuis le backend
  useEffect(() => {
    const fetchEnseignants = async () => {
      try {
        const response = await axios.get(`${API_URL}enseignants/`);
        console.log('Enseignants:', response.data); // Vérifiez les données
        setEnseignants(response.data);
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Erreur',
          text2: 'Erreur lors du chargement des enseignants.',
        });
      }
    };

    fetchEnseignants();
  }, []);

  // Récupérer les détails de la matière à modifier
  useEffect(() => {
    const fetchMatiereDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}matieres/${id_matiere}/`);
        const { enseignant, nom_matiere } = response.data;
        console.log('Détails de la matière:', response.data); // Vérifiez les données
        setSelectedEnseignantId(enseignant.id_enseignant); // Remplir le champ enseignant
        setNomMatiere(nom_matiere); // Remplir le champ nom de matière
        setLoading(false); // Fin du chargement
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Erreur',
          text2: 'Erreur lors du chargement des détails de la matière.',
        });
      }
    };

    fetchMatiereDetails();
  }, [id_matiere]);

  // Fonction pour mettre à jour la matière
  const handleUpdate = () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment modifier cette matière ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Confirmer",
          onPress: async () => {
            try {
              await axios.patch(`${API_URL}matieres/${id_matiere}/`, {
                enseignant_id: selectedEnseignantId,
                nom_matiere: nomMatiere,
              });
              Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Succès',
                text2: 'Matière modifiée avec succès.',
              });
              navigation.goBack(); // Retourner à l'écran précédent
            } catch (error) {
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erreur',
                text2: 'Erreur lors de la mise à jour de la matière.',
              });
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
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

        <Text style={styles.label}>Sélectionner l'Enseignant</Text>
        <Picker
          selectedValue={selectedEnseignantId}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedEnseignantId(itemValue)}
        >
          {enseignants.map((enseignant) => (
            <Picker.Item
              key={enseignant.id_enseignant}
              label={`${enseignant.first_name} ${enseignant.last_name}`}
              value={enseignant.id_enseignant}
            />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Nom Matière"
          placeholderTextColor="#ccc"
          value={nomMatiere}
          onChangeText={setNomMatiere}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdate}
        >
          <Text style={styles.buttonText}>Mettre à jour</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#6200ea',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditMatiere;



