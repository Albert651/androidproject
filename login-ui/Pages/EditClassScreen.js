import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

function EditClassScreen({ route, navigation }) {
  const { id } = route.params; // Obtenez l'ID de la classe depuis les paramètres de la route
  const [nomClasse, setNomClasse] = useState('');
  const [effectifEleves, setEffectifEleves] = useState('');

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.88.197:8000/classes/${id}/`);
        setNomClasse(response.data.nom_classe);
        setEffectifEleves(response.data.effectif_elelves.toString());
      } catch (error) {
        Alert.alert('Erreur', 'Erreur lors du chargement des données.');
      }
    };

    fetchClassDetails();
  }, [id]);

  const handleUpdateClass = () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment modifier ces informations ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Confirmer",
          onPress: async () => {
            try {
              await axios.put(`http://192.168.88.197:8000/classes/${id}/`, {
                nom_classe: nomClasse,
                effectif_elelves: effectifEleves || 0, // Utilisez 0 si le champ est vide
              });
              Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Classe modifiée',
                text2: 'Les informations de la classe ont été mises à jour avec succès.',
              });
              navigation.goBack(); // Retourner à l'écran précédent
            } catch (error) {
              Alert.alert('Erreur', 'Erreur lors de la mise à jour de la classe.');
            }
          },
          style: "destructive"
        }
      ]
    );
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
        <TextInput
          style={styles.input}
          placeholder="Effectif"
          placeholderTextColor="#ccc" // Couleur du texte de l'espace réservé
          keyboardType="numeric"
          value={effectifEleves}
          onChangeText={setEffectifEleves}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdateClass}
        >
          <Text style={styles.buttonText}>Mettre à jour</Text>
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

export default EditClassScreen;

