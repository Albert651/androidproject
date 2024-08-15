import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/fr'; // Import French locale for moment

const API_URL = 'http://192.168.88.197:8000/'; // Base URL de l'API

function AddNoteScreen({ navigation }) {
  const [eleves, setEleves] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [classes, setClasses] = useState([]);
  const [idEleve, setIdEleve] = useState('');
  const [idMatiere, setIdMatiere] = useState('');
  const [idClasse, setIdClasse] = useState('');
  const [note, setNote] = useState('');
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [showDateDebutPicker, setShowDateDebutPicker] = useState(false);
  const [showDateFinPicker, setShowDateFinPicker] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [elevesResponse, matieresResponse, classesResponse] = await Promise.all([
          axios.get(`${API_URL}eleves/`),
          axios.get(`${API_URL}matieres/`),
          axios.get(`${API_URL}classes/`)
        ]);

        setEleves(elevesResponse.data);
        setMatieres(matieresResponse.data);
        setClasses(classesResponse.data);
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Erreur',
          text2: 'Erreur lors du chargement des données.',
        });
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}notes/`, {
        id_eleve: idEleve,
        id_matiere: idMatiere,
        note: parseFloat(note),
        date_debut: dateDebut.toISOString().split('T')[0],
        date_fin: dateFin.toISOString().split('T')[0],
        id_classe: idClasse,
      });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Succès',
        text2: 'Note ajoutée avec succès !',
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erreur',
        text2: 'Erreur lors de l\'ajout de la note.',
      });
    }
  };

  const onChangeDateDebut = (event, selectedDate) => {
    setShowDateDebutPicker(false);
    if (selectedDate) setDateDebut(selectedDate);
  };

  const onChangeDateFin = (event, selectedDate) => {
    setShowDateFinPicker(false);
    if (selectedDate) setDateFin(selectedDate);
  };

  return (
    <ImageBackground
      source={require('../assests/images/fond.jpeg')} // Assurez-vous que le chemin est correct
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.label}>Classe</Text>
          <Picker
            selectedValue={idClasse}
            onValueChange={(itemValue) => setIdClasse(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Sélectionnez une classe" value="" />
            {classes.map(classe => (
              <Picker.Item key={classe.id_classe} label={classe.nom_classe} value={classe.id_classe} />
            ))}
          </Picker>

          <Text style={styles.label}>Élève</Text>
          <Picker
            selectedValue={idEleve}
            onValueChange={(itemValue) => setIdEleve(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Sélectionnez un élève" value="" />
            {eleves.map(eleve => (
              <Picker.Item key={eleve.id_eleve} label={`${eleve.nom} ${eleve.prenom}`} value={eleve.id_eleve} />
            ))}
          </Picker>

          <Text style={styles.label}>Matière</Text>
          <Picker
            selectedValue={idMatiere}
            onValueChange={(itemValue) => setIdMatiere(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Sélectionnez une matière" value="" />
            {matieres.map(matiere => (
              <Picker.Item key={matiere.id_matiere} label={matiere.nom_matiere} value={matiere.id_matiere} />
            ))}
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Note"
            keyboardType="numeric"
            value={note}
            onChangeText={setNote}
          />

          <Text style={styles.label}>Date Début</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDateDebutPicker(true)}>
            <Text style={styles.dateButtonText}>{moment(dateDebut).format('D MMMM YYYY')}</Text>
          </TouchableOpacity>
          {showDateDebutPicker && (
            <DateTimePicker
              mode="date"
              value={dateDebut}
              display="default"
              onChange={onChangeDateDebut}
            />
          )}

          <Text style={styles.label}>Date Fin</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDateFinPicker(true)}>
            <Text style={styles.dateButtonText}>{moment(dateFin).format('D MMMM YYYY')}</Text>
          </TouchableOpacity>
          {showDateFinPicker && (
            <DateTimePicker
              mode="date"
              value={dateFin}
              display="default"
              onChange={onChangeDateFin}
            />
          )}

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Ajouter Note</Text>
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
    padding: 16,
  },
  container: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
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
  dateButton: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  dateButtonText: {
    color: '#000',
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

export default AddNoteScreen;
