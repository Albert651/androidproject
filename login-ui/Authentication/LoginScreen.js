import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Overlay } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);  // Nouvelle état pour la visibilité du mot de passe
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const storeToken = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  const handleLogin = async () => {
    console.log('Handle login called');
    try {
      const response = await axios.post('http://192.168.88.197:8000/login/', {
        username,
        password,
      });
  
      console.log('Login successful:', response.data);
      const { access, refresh } = response.data;
  
      await storeToken('access_token', access);
      await storeToken('refresh_token', refresh);
  
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main', state: { routes: [{ name: 'Home', params: { user: response.data } }] } }],
      });
    } catch (error) {
      console.log('Login error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'Erreur de connexion');
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assests/images/Logo.png')}
        style={styles.logo}
      />
      <Input
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        inputStyle={styles.inputText}
      />
      <Input
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!passwordVisible}  // Utilisez l'état pour afficher ou masquer le mot de passe
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        inputStyle={styles.inputText}
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
      <Button title="Connexion" onPress={handleLogin} buttonStyle={styles.button} />

      <View style={styles.linkContainer}>
        <Button
          title="Vous n'avez pas de compte ? Inscrivez-vous"
          type="clear"
          titleStyle={styles.linkText}
          onPress={() => navigation.navigate('Register')}
        />
      </View>

      <View style={styles.linkContainer}>
        <Button
          title="Mot de passe oublié ? Réinitialisez"
          type="clear"
          titleStyle={styles.linkText}
          onPress={() => navigation.navigate('ResetPassword')}
        />
      </View>

      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <Text>{error}</Text>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#DDD',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#6200ea',
    borderRadius: 10,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#6200ea',
  },
});

export default LoginScreen;
