import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';

const DetailsScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assests/images/fond.jpeg')} // Assurez-vous que le chemin est correct
      style={styles.background}
      resizeMode="cover" // Essayez aussi "contain" ou "stretch" si nécessaire
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ClasseScreen')}
        >
          <Icon name="class" type="material" color="#fff" size={24} />
          <Text style={styles.buttonText}>Classe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Matieres')}
        >
          <Icon name="subject" type="material" color="#fff" size={24} />
          <Text style={styles.buttonText}>Matière</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EleveScreen')}
        >
          <Icon name="person" type="material" color="#fff" size={24} />
          <Text style={styles.buttonText}>Élève</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NoteScreen')}
        >
          <Icon name="assessment" type="material" color="#fff" size={24} />
          <Text style={styles.buttonText}>Évaluation</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%', // Assure que l'image couvre toute la largeur
    height: '100%', // Assure que l'image couvre toute la hauteur
    justifyContent: 'center', // Centre le contenu verticalement
    alignItems: 'center', // Centre le contenu horizontalement
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#6200ea', // Couleur de fond des boutons
    borderRadius: 10, // Bordures arrondies
    width: 300, // Largeur fixe du bouton
    height: 60, // Hauteur fixe du bouton
    alignItems: 'center',
    justifyContent: 'center', // Centre le contenu horizontalement et verticalement
    marginVertical: 10,
    flexDirection: 'row', // Alignement horizontal des éléments
    elevation: 3, // Ombre pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff', // Couleur du texte des boutons
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10, // Espacement entre l'icône et le texte
  },
});

export default DetailsScreen;
