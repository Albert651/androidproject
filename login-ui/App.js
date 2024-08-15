import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import ToastConfig from './ToastConfig'; // Assurez-vous que ce fichier existe et est correctement configuré

// Importation des écrans
import HomeScreen from './Pages/HomeScreen';
import LoginScreen from './Authentication/LoginScreen';
import RegisterScreen from './Authentication/RegisterScreen';
import ResetPasswordScreen from './Authentication/ResetPasswordScreen';
import DetailsScreen from './Pages/DetailsScreen';
import SettingsScreen from './Pages/SettingsScreen';
import ClasseScreen from './Pages/ClasseScreen';
import EleveScreen from './Pages/EleveScreen';
import NoteScreen from './Pages/NoteScreen';
import AddNoteScreen from './Pages/AddNoteScreen';
import EditNoteScreen from './Pages/EditNoteScreen';
import Matieres from './Pages/Matieres';
import AddMatiere from './Pages/AddMatiere'; 
import EditMatiere from './Pages/EditMatiere';
import AddClassScreen from './Pages/AddClassScreen';
import EditClassScreen from './Pages/EditClassScreen';
import AddEleveScreen from './Pages/AddEleveScreen';
import EditEleveScreen from './Pages/EditEleveScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Accueil"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Accueil') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Liste') {
          iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === 'Inscription') {
          iconName = focused ? 'person-add' : 'person-add-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6200ea',
      tabBarInactiveTintColor: 'grey',
      tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
      tabBarStyle: { padding: 10, height: 70 },
    })}
  >
    <Tab.Screen name="Accueil" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Liste" component={DetailsScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Inscription" component={SettingsScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#6200ea' }, // Couleur de fond du header
          headerTintColor: '#fff', // Couleur du texte du header
          headerTitleStyle: { fontWeight: 'bold' }, // Style du texte du header
        }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Connexion' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Inscription' }} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ title: 'Réinitialiser le mot de passe' }} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ title: 'Gestion de Note' }} />
        <Stack.Screen name="ClasseScreen" component={ClasseScreen} options={{ title: 'Gestion des Classes' }} />
        <Stack.Screen name="EleveScreen" component={EleveScreen} options={{ title: 'Gestion des Élèves' }} />
        <Stack.Screen name="NoteScreen" component={NoteScreen} options={{ title: 'Gestion des Notes' }} />
        <Stack.Screen name="Matieres" component={Matieres} options={{ title: 'Gestion des Matières' }} />
        <Stack.Screen name="AddMatiere" component={AddMatiere} options={{ title: 'Ajouter une Matière' }} /> 
        <Stack.Screen name="EditMatiere" component={EditMatiere} options={{ title: 'Modifier la Matière' }} />
        <Stack.Screen name="AddClassScreen" component={AddClassScreen} options={{ title: 'Ajouter une Classe' }} />
        <Stack.Screen name="EditClassScreen" component={EditClassScreen} options={{ title: 'Modifier la Classe' }} />
        <Stack.Screen name="AddEleveScreen" component={AddEleveScreen} options={{ title: 'Ajouter un Élève' }} />
        <Stack.Screen name="EditEleveScreen" component={EditEleveScreen} options={{ title: 'Modifier l’Élève' }} />
        <Stack.Screen name="AddNoteScreen" component={AddNoteScreen} options={{ title: 'Ajouter une Note' }} />
        <Stack.Screen name="EditNoteScreen" component={EditNoteScreen} options={{ title: 'Modifier la Note' }} />
      </Stack.Navigator>

      <Toast ref={(ref) => Toast.setRef(ref)} config={ToastConfig} />
    </NavigationContainer>
  );
}
