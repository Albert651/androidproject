import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

function AddClassScreen({ navigation }) {
  const [nomClasse, setNomClasse] = useState('');

  const handleAddClass = async () => {
    if (!nomClasse) {
      Alert.alert('Erreur', 'Veuillez remplir le champ nom de la classe.');
      return;
    }

    try {
      await axios.post('http://192.168.88.197:8000/classes/', {
        nom_classe: nomClasse,
      });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Succès',
        text2: 'Classe ajoutée avec succès !',
      });
      navigation.goBack(); // Retourner à l'écran précédent
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de l\'ajout de la classe.');
    }
  };

  return (
    <ImageBackground
      source={require('../assests/images/fond.jpeg')} // Assurez-vous que le chemin est correct
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nom de la classe"
          placeholderTextColor="#ccc" // Couleur du texte de l'espace réservé
          value={nomClasse}
          onChangeText={setNomClasse}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddClass}
        >
          <Text style={styles.buttonText}>Ajouter</Text>
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
    justifyContent: 'center',
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

export default AddClassScreen;

