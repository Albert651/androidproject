import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

function AddEleveScreen({ navigation }) {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [addresse, setAddresse] = useState('');
  const [dateNais, setDateNais] = useState(new Date());
  const [matricule, setMatricule] = useState('');
  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://192.168.88.197:8000/classes/');
        setClasses(response.data);
      } catch (error) {
        setError('Erreur lors du chargement des classes');
      }
    };

    fetchClasses();
  }, []);

  const handleAddEleve = async () => {
    if (!selectedClass || !nom || !prenom || !addresse || !matricule) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      await axios.post('http://192.168.88.197:8000/eleves/', {
        id_classe: selectedClass,
        nom,
        prenom,
        addresse,
        date_nais: dateNais.toISOString().split('T')[0],
        matricule
      });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Succès',
        text2: 'Élève ajouté avec succès !',
      });
      navigation.goBack();
    } catch (error) {
      setError('Le numéro matricule est déjà existant ou une autre erreur est survenue.');
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erreur',
        text2: 'Erreur lors de l\'ajout de l\'élève.',
      });
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateNais;
    setShowDatePicker(false);
    setDateNais(currentDate);
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
          placeholder="Nom"
          placeholderTextColor="#ccc"
          value={nom}
          onChangeText={setNom}
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          placeholderTextColor="#ccc"
          value={prenom}
          onChangeText={setPrenom}
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse"
          placeholderTextColor="#ccc"
          value={addresse}
          onChangeText={setAddresse}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Date de Naissance"
            placeholderTextColor="#ccc"
            value={dateNais.toISOString().split('T')[0]}
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateNais}
            mode='date'
            display='default'
            onChange={handleDateChange}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Matricule"
          placeholderTextColor="#ccc"
          value={matricule}
          onChangeText={setMatricule}
        />
        <Text style={styles.label}>Classe</Text>
        <Picker
          selectedValue={selectedClass}
          onValueChange={(itemValue) => setSelectedClass(itemValue)}
          style={styles.picker}
        >
          {classes.map((classe) => (
            <Picker.Item key={classe.id_classe} label={classe.nom_classe} value={classe.id_classe} />
          ))}
        </Picker>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddEleve}
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#fff',
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

export default AddEleveScreen;

