import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import ContactListScreen from '../screens/ContactListScreen';
import ContactDetailsScreen from '../screens/ContactDetailsScreenn';
import AddEditContactScreen from '../screens/AddEditContactScreen';
import AccessibilityScreen from '../screens/AccessibilityScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ContactList" component="{ContactListScreen}" options={{title:'Contacts'}} />
        <Stack.Screen name="ContactDetails" component="{ContactDetailsScreen}" options={{title:'Contact Details'}} />
        <Stack.Screen name="AddEditContact" component="{AddEditContactScreen}" options={{title:'Add/edit Contact Details'}} />
        <Stack.Screen name="Accessibility" component="{AccessibilityScreen}" options={{title:'Accessibility'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}