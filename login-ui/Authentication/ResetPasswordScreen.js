import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text, Overlay } from 'react-native-elements';
import axios from 'axios';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setVisible(true);
      return;
    }

    try {
      await axios.post('http://your-django-server-url/auth/reset-password/', {
        email,
        new_password: newPassword,
      });
      navigation.navigate('Login');
    } catch (error) {
      setError(error.response?.data?.error || 'Erreur lors de la réinitialisation du mot de passe');
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Réinitialiser le mot de passe</Text>

      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        placeholderTextColor="#999"
      />
      <Input
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        placeholderTextColor="#999"
      />
      <Input
        placeholder="Confirmez le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
        placeholderTextColor="#999"
      />
      <Button
        title="Réinitialiser"
        onPress={handleResetPassword}
        buttonStyle={styles.button}
      />

      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <Text>{error}</Text>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#DDD',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#6200ea',
    borderRadius: 8,
  },
});

export default ResetPasswordScreen;

