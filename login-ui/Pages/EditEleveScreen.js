import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ImageBackground, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

const API_URL = 'http://192.168.88.197:8000/'; // Remplacez par l'URL de votre API

function EditEleveScreen({ route, navigation }) {
  const { id } = route.params;
  const [eleve, setEleve] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [addresse, setAddresse] = useState('');
  const [dateNais, setDateNais] = useState(new Date());
  const [matricule, setMatricule] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchEleve = async () => {
      try {
        const response = await axios.get(`${API_URL}eleves/${id}/`);
        const data = response.data;
        setEleve(data);
        setNom(data.nom);
        setPrenom(data.prenom);
        setAddresse(data.addresse);
        setDateNais(new Date(data.date_nais));
        setMatricule(data.matricule);
        setSelectedClass(data.id_classe);
        setLoading(false);
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Erreur',
          text2: 'Erreur lors du chargement des informations de l\'élève.',
        });
        setLoading(false);
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${API_URL}classes/`);
        setClasses(response.data);
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Erreur',
          text2: 'Erreur lors du chargement des classes.',
        });
      }
    };

    fetchEleve();
    fetchClasses();
  }, [id]);

  const handleUpdateEleve = async () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment modifier les informations de cet élève ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Confirmer",
          onPress: async () => {
            try {
              await axios.put(`${API_URL}eleves/${id}/`, {
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
                text2: 'Informations de l\'élève mises à jour avec succès.',
              });
              navigation.navigate('EleveScreen');
            } catch (error) {
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erreur',
                text2: 'Erreur lors de la modification de l\'élève.',
              });
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateNais;
    setShowDatePicker(false);
    setDateNais(currentDate);
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setNom}
          />
          <Text style={styles.label}>Prénom</Text>
          <TextInput
            style={styles.input}
            value={prenom}
            onChangeText={setPrenom}
          />
          <Text style={styles.label}>Adresse</Text>
          <TextInput
            style={styles.input}
            value={addresse}
            onChangeText={setAddresse}
          />
          <Text style={styles.label}>Date de Naissance</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
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
          <Text style={styles.label}>Matricule</Text>
          <TextInput
            style={styles.input}
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
          <TouchableOpacity style={styles.button} onPress={handleUpdateEleve}>
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>
          {/* Ajouter Toast */}
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    color: '#fff',
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

export default EditEleveScreen;


