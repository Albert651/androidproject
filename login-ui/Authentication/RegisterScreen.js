import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Overlay } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);  // Etat pour la visibilité du mot de passe
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);  // Etat pour la visibilité de la confirmation du mot de passe
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setVisible(true);
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.88.197:8000/register/', {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password2: confirmPassword, // Assurez-vous d'envoyer le mot de passe de confirmation
      });
      if (response.status === 201) {
        navigation.navigate('Login');
      }
    } catch (error) {
      setError(error.response?.data?.password || 'Erreur lors de l\'inscription');
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}> 

      <Input
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        placeholderTextColor="#999"
        style={styles.inputText}
      />
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        placeholderTextColor="#999"
        style={styles.inputText}
      />
      <Input
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        placeholderTextColor="#999"
        style={styles.inputText}
      />
      <Input
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        placeholderTextColor="#999"
        style={styles.inputText}
      />
      <Input
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!passwordVisible}  // Utiliser l'état pour masquer/afficher le mot de passe
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        placeholderTextColor="#999"
        style={styles.inputText}
        rightIcon={
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        }
      />
      <Input
        placeholder="Confirmez le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!confirmPasswordVisible}  // Utiliser l'état pour masquer/afficher la confirmation du mot de passe
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        placeholderTextColor="#999"
        style={styles.inputText}
        rightIcon={
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Ionicons
              name={confirmPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        }
      />
      <Button
        title="Inscription"
        onPress={handleRegister}
        buttonStyle={styles.button}
      />

      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <Text style={styles.errorText}>{error}</Text>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,  // Réduit le padding global
    backgroundColor: '#F5F5F5',
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 20,  // Réduit la taille du titre
  },
  inputContainer: {
    marginBottom: 10,
    width: '100%',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    borderColor: '#DDD',
    borderWidth: 1,
  },
  inputText: {
    fontSize: 14,  // Réduit la taille du texte dans les entrées
  },
  button: {
    backgroundColor: '#6200ea',
    borderRadius: 6,
    paddingVertical: 8,  // Réduit le padding vertical du bouton
    paddingHorizontal: 16, // Réduit le padding horizontal du bouton
  },
  errorText: {
    color: 'red',
    fontSize: 14,  // Réduit la taille du texte d'erreur
    textAlign: 'center',
  },
});

export default RegisterScreen;


