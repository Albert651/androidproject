import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';

const API_URL = 'http://192.168.88.197:8000/'; // Base URL de l'API

function AddMatiere({ navigation }) {
  const [enseignants, setEnseignants] = useState([]);
  const [selectedEnseignantId, setSelectedEnseignantId] = useState('');
  const [nomMatiere, setNomMatiere] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnseignants = async () => {
      try {
        const response = await axios.get(`${API_URL}enseignants/`);
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

  const handleAddMatiere = async () => {
    if (!selectedEnseignantId || !nomMatiere.trim()) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erreur',
        text2: 'Veuillez remplir tous les champs.',
      });
      return;
    }

    try {
      await axios.post(`${API_URL}matieres/`, {
        enseignant_id: selectedEnseignantId,
        nom_matiere: nomMatiere.trim()
      });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Succès',
        text2: 'Matière ajoutée avec succès !',
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erreur',
        text2: 'Erreur lors de l\'ajout de la matière.',
      });
    }
  };

  // Filtrer les enseignants valides
  const validEnseignants = enseignants.filter(enseignant => enseignant.id_enseignant);

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
          onValueChange={(itemValue) => setSelectedEnseignantId(itemValue)}
          style={styles.picker}
        >
          {validEnseignants.length > 0 ? (
            validEnseignants.map((enseignant) => (
              <Picker.Item
                key={enseignant.id_enseignant}
                label={`${enseignant.first_name} ${enseignant.last_name}`}
                value={enseignant.id_enseignant}
              />
            ))
          ) : (
            <Picker.Item label="Aucun Enseignant Disponible" value="" />
          )}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Nom de la Matière"
          placeholderTextColor="#ccc"
          value={nomMatiere}
          onChangeText={setNomMatiere}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddMatiere}
        >
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>

        {/* Ajouter Toast */}
        <Toast ref={(ref) => Toast.setRef(ref)} />
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AddMatiere;


