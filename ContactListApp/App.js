import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['props.pointerEvents is deprecated']);

//Screens
import ContactListScreen from './src/screens/ContactListScreen';
import AddContactScreen from './src/screens/AddContactScreen';
import ContactDetailsScreen from './src/screens/ContactDetailsScreen';
import EditContactScreen from './src/screens/EditContactScreen';
import AccessibilityScreen from './src/screens/AccessibilityScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ContactList" component={ContactListScreen} options={{title: 'Contacts'}} />
        <Stack.Screen name="AddContact" component={AddContactScreen} options={{title: 'New contact'}} />
        <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} options={{title: 'Contact details'}} />
        <Stack.Screen name="EditContact" component={EditContactScreen} options={{title: 'Update contact' }} />
        <Stack.Screen name="Accessibility" component={AccessibilityScreen} options={{title: 'Settings'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}