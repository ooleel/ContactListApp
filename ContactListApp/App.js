import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import ContactListScreen from './src/screens/ContactListScreen';
import ContactDetailsScreen from './src/screens/ContactDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ContactList" component={ContactListScreen} options={{title:'Contacts'}} />
        <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} options={{title:'Contact Details'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
