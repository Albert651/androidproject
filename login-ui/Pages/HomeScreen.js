import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Animated } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initialisation de l'animation de fondu

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // Durée de l'animation en millisecondes
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ImageBackground
      source={require('../assests/images/fond.jpeg')} // Vérifie le chemin correct
      style={styles.background}
      resizeMode="cover" // Essaie "contain" ou "stretch" si nécessaire
    >
      <View style={styles.container}>
        <Animated.View style={{ ...styles.welcomeTextContainer, opacity: fadeAnim }}>
          <Text style={styles.welcomeText}>Bienvenue !</Text>
        </Animated.View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login')}>
          <Text style={styles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',  // Assure que l'image couvre toute la largeur
    height: '100%', // Assure que l'image couvre toute la hauteur
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Pas besoin de backgroundColor ici, car l'image de fond remplit déjà l'écran
  },
  welcomeTextContainer: {
    // Style supplémentaire pour le conteneur du texte si nécessaire
  },
  welcomeText: {
    fontSize: 50, // Taille du texte très grande
    fontWeight: 'bold', // Met le texte en gras
    color: '#fff', // Couleur du texte en noir
    marginBottom: 20, // Espacement sous le texte
  },
  button: {
    backgroundColor: '#6200ea', // Couleur de fond du bouton
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // Couleur du texte du bouton
    fontSize: 16,
  },
});

export default HomeScreen;

