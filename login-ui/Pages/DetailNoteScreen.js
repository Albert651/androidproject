import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailsNoteScreen = ({ route }) => {
  const { studentId } = route.params;

  // Vous pouvez obtenir les détails de la note pour cet élève en fonction de l'id (studentId)
  // Par exemple, si vous avez des données en local ou faites une requête API

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la Note</Text>
      <Text>ID de l'élève : {studentId}</Text>
      {/* Affichez ici les détails de la note */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DetailsNoteScreen;
