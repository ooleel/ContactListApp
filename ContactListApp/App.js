import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStaticNavigator } from '@react-navigation/native';
import ContactListScreen from './screens/ContactListScreen';
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ContactList" component="ContactListScreen" options={{title:'Contacts'}} />
        <Stack.Screen name="ContactDetails" component="ContactDetailsScreen" options={{title:'Contact Details'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
