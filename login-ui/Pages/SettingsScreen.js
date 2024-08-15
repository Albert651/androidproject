import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const SettingsScreen = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState(new Date());
  const [numeroMatricule, setNumeroMatricule] = useState('');
  const [classe, setClasse] = useState('');
  const [addresse, setAddresse] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  // Fonction pour charger les classes
  const fetchClasses = useCallback(async () => {
    try {
      const response = await fetch('http://192.168.88.197:8000/classes/');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des classes');
      }
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      setError('Erreur lors du chargement des classes');
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erreur',
        text2: 'Erreur lors du chargement des classes.',
      });
    }
  }, []);

  // Utilisation de useFocusEffect pour rafraîchir les données lorsque l'écran est ouvert
  useFocusEffect(
    useCallback(() => {
      fetchClasses();
    }, [fetchClasses])
  );

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateNaissance;
    setShowDatePicker(false);
    setDateNaissance(currentDate);
  };

  const handleSubmit = async () => {
    if (!nom || !prenom || !addresse || !dateNaissance || !numeroMatricule || !classe) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erreur',
        text2: 'Veuillez remplir tous les champs.',
      });
      return;
    }

    const formattedDateNaissance = dateNaissance.toISOString().split('T')[0];

    const inscriptionData = {
      nom,
      prenom,
      addresse,
      date_nais: formattedDateNaissance,
      matricule: numeroMatricule,
      id_classe: classe,
    };

    try {
      const response = await fetch('http://192.168.88.197:8000/inscriptions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inscriptionData),
      });

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(`Erreur lors de l'inscription: ${responseBody}`);
      }

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Succès',
        text2: 'Élève ajouté avec succès !',
      });
      setNom('');
      setPrenom('');
      setDateNaissance(new Date());
      setNumeroMatricule('');
      setClasse('');
      setAddresse('');

      navigation.navigate('EleveScreen');
    } catch (error) {
      console.error('Error submitting form:', error);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erreur',
        text2: error.message || 'Erreur lors de l\'inscription.',
      });
    }
  };

  return (
    <ImageBackground
      source={require('../assests/images/fond.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nom:</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setNom}
            placeholder="Entrez le nom"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Prénom:</Text>
          <TextInput
            style={styles.input}
            value={prenom}
            onChangeText={setPrenom}
            placeholder="Entrez le prénom"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Adresse:</Text>
          <TextInput
            style={styles.input}
            value={addresse}
            onChangeText={setAddresse}
            placeholder="Entrez l'adresse"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Date de Naissance:</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              value={dateNaissance.toISOString().split('T')[0]}
              placeholder="JJ/MM/AAAA"
              placeholderTextColor="#888"
              editable={false}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateNaissance}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Numéro Matricule:</Text>
          <TextInput
            style={styles.input}
            value={numeroMatricule}
            onChangeText={setNumeroMatricule}
            placeholder="Entrez le numéro matricule"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Classe:</Text>
          <Picker
            selectedValue={classe}
            onValueChange={(itemValue) => setClasse(itemValue)}
            style={styles.picker}
          >
            {classes.map((classe) => (
              <Picker.Item key={classe.id_classe} label={classe.nom_classe} value={classe.id_classe} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Inscrire</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'rgba(249, 249, 249, 0.8)',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;



