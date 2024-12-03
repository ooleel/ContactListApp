import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import ContactListScreen from './src/screens/ContactListScreen';
import AddContactScreen from './src/screens/AddContactScreen';
import ContactDetailsScreen from './src/screens/ContactDetailsScreen';
import EditContactScreen from './src/screens/EditContactScreen';
import AccessibilityScreen from './src/screens/AccessibilityScreen';

const Stack = createStackNavigator();

export default function App() {
  //global state for accessibility settings
  const [fontSize, setFontSize] = useState(14);
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    brightness: 1,
    isSoundEnabled: false,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Contacts">
          {(props) => (
            <ContactListScreen
              {...props}
              fontSize={fontSize}
              setFontSize={setFontSize}
              accessibilitySettings={accessibilitySettings}
              setAccessibilitySettings={setAccessibilitySettings}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="ContactDetails">
          {(props) => (
            <ContactDetailsScreen
              {...props}
              fontSize={fontSize}
              setFontSize={setFontSize}
              accessibilitySettings={accessibilitySettings}
              setAccessibilitySettings={setAccessibilitySettings}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddContact" component={AddContactScreen} options={{title: 'New contact'}} />
        
        <Stack.Screen name="EditContact" component={EditContactScreen} options={{title: 'Update contact' }} />

        <Stack.Screen name="Accessibility">
          {(props) => (
            <AccessibilityScreen
              {...props}
              fontSize={fontSize}
              setFontSize={setFontSize}
              accessibilitySettings={accessibilitySettings}
              setAccessibilitySettings={setAccessibilitySettings}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}