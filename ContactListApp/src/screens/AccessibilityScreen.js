import React, {useState, useEffect} from 'react';
import Slider from '@react-native-community/slider';
import {View, Switch, StyleSheet, TouchableOpacity, Text} from 'react-native';

//settings
import * as Brightness from 'expo-brightness'; //done: npx expo install expo-brightness
import {Audio} from 'expo-av'; //done: npx expo install expo-av

export default function AccessibilityScreen({fontSize, setFontSize,accessibilitySettings, setAccessibilitySettings, navigation}) {
    const [sound, setSound] = useState();

    const handleBrightnessChange = async (value) => {
        try {
            const updatedSettings = {...accessibilitySettings, brightness: value};
            setAccessibilitySettings(updatedSettings); //updates global state
            await Brightness.setBrightnessAsync(value);
        } catch (error) {
            console.error('Error setting brightness:', error);
        }
    };

    const handleSoundToggle = async (value) => {
        try {
            const updatedSettings = {...accessibilitySettings, isSoundEnabled: value};
            setAccessibilitySettings(updatedSettings); //updates global state
            if (value) {
                const {sound} = await Audio.Sound.createAsync(require('../../assets/click.mp3'));
                setSound(sound);
                await sound.unloadAsync(); //cleanup
            }
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };
    
    const handleSave = async () => {
        navigation.goBack(); //back to previous screen (ContactsList)
    };

    return (
        <View style={styles.container}>
            <View style={styles.settingsContainer}>
                <Text style={styles.label}>Brightness</Text>
                <Slider 
                    minimumValue={0.1} 
                    maximumValue={1} 
                    value={accessibilitySettings.brightness}   
                    onSlidingComplete={handleBrightnessChange}
                />
            </View>
            
            <View style={styles.settingsContainer}>
                <Text style={styles.label}>Font size</Text>
                <Slider 
                    minimumValue={10} 
                    maximumValue={24} 
                    value={fontSize} 
                    onSlidingComplete={setFontSize}
                />
                <Text style={{fontSize: fontSize}}>Preview font size...</Text>
            </View>
            
            <View style={styles.settingsContainer}>
                <Text style={styles.label}>Sound effects</Text>
                <Switch 
                    trackColor={{false: 'red', true: 'green'}}
                    thumbColor={accessibilitySettings.isSoundEnabled ? 'blue' : 'orange'}
                    onValueChange={handleSoundToggle}
                    value={accessibilitySettings.isSoundEnabled} 
                />
            </View>
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }, 
    settingsContainer: {
        //flex: 1,
        padding: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
    },
    saveButton: {
        backgroundColor: '#c64c38',
        padding: 16,
        position: 'absolute',
        bottom: 16,
        right: 16,
        borderRadius: 17,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});