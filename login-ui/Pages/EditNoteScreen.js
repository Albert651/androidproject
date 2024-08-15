import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';

const API_URL_CLASSES = 'http://192.168.88.197:8000/classes/';
const API_URL_STUDENTS = 'http://192.168.88.197:8000/eleves/';
const API_URL_SUBJECTS = 'http://192.168.88.197:8000/matieres/';
const API_URL_NOTES = 'http://192.168.88.197:8000/notes/';

function EditNoteScreen({ route, navigation }) {
  const { noteId, classId, studentId, subjectId, noteValue, startDate, endDate } = route.params;

  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState(classId || '');
  const [selectedStudent, setSelectedStudent] = useState(studentId || '');
  const [selectedSubject, setSelectedSubject] = useState(subjectId || '');
  const [note, setNote] = useState(noteValue || '');
  const [startDateState, setStartDate] = useState(new Date(startDate) || new Date());
  const [endDateState, setEndDate] = useState(new Date(endDate) || new Date());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesResponse, studentsResponse, subjectsResponse] = await Promise.all([
          axios.get(API_URL_CLASSES),
          axios.get(API_URL_STUDENTS),
          axios.get(API_URL_SUBJECTS),
        ]);
        setClasses(classesResponse.data);
        setStudents(studentsResponse.data);
        setSubjects(subjectsResponse.data);
      } catch (error) {
        setError('Erreur lors du chargement des données');
      }
    };

    fetchData();
  }, []);

  const handleUpdateNote = async () => {
    if (!selectedClass || !selectedStudent || !selectedSubject || !note) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);

    try {
      await axios.patch(`${API_URL_NOTES}${noteId}/`, {
        id_classe: selectedClass,
        id_eleve: selectedStudent,
        id_matiere: selectedSubject,
        note: note,
        date_debut: startDateState.toISOString().split('T')[0],
        date_fin: endDateState.toISOString().split('T')[0],
      });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Succès',
        text2: 'Note modifiée avec succès !',
      });
      navigation.goBack();
    } catch (error) {
      setError('Erreur lors de la mise à jour de la note.');
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erreur',
        text2: 'Erreur lors de la mise à jour de la note.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assests/images/fond.jpeg')} // Assurez-vous que le chemin est correct
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#6200ea" />
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Valeur de la Note"
              placeholderTextColor="#ccc"
              value={note}
              onChangeText={setNote}
              keyboardType="numeric"
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
            <Text style={styles.label}>Élève</Text>
            <Picker
              selectedValue={selectedStudent}
              onValueChange={(itemValue) => setSelectedStudent(itemValue)}
              style={styles.picker}
            >
              {students.map((student) => (
                <Picker.Item key={student.id_eleve} label={`${student.nom} ${student.prenom}`} value={student.id_eleve} />
              ))}
            </Picker>
            <Text style={styles.label}>Matière</Text>
            <Picker
              selectedValue={selectedSubject}
              onValueChange={(itemValue) => setSelectedSubject(itemValue)}
              style={styles.picker}
            >
              {subjects.map((subject) => (
                <Picker.Item key={subject.id_matiere} label={subject.nom_matiere} value={subject.id_matiere} />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.button}
              onPress={handleUpdateNote}
            >
              <Text style={styles.buttonText}>Mettre à jour</Text>
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </>
        )}
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
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
});

export default EditNoteScreen;
