import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import ContactListScreen from './src/screens/ContactListScreen';
import ContactDetailsScreen from './src/screens/ContactDetailsScreen';
import AddEditContactScreen from './src/screens/AddEditContactScreen';
import AccessibilityScreen from './src/screens/AccessibilityScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ContactList" component={ContactListScreen} options={{title: 'Contacts'}} />
        <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} options={{title: 'Contact Details'}} />
        <Stack.Screen name="AddEditContact" component={AddEditContactScreen} options={{title: 'Add/Edit Contact' }} />
        <Stack.Screen name="Accessibility" component={AccessibilityScreen} options={{title: 'Settings'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


    
//debug
// <View style={styles.container}>
//   <Text style={styles.text}>Hello, Contact List App is working!</Text>
// </View>