import React, {useState, useEffect} from 'react';
import Slider from '@react-native-community/slider';
import {View, Switch, StyleSheet, TouchableOpacity, Text} from 'react-native';

//settings
import * as Brightness from 'expo-brightness'; //done: npx expo install expo-brightness
import {Audio} from 'expo-av'; //done: npx expo install expo-av
import AsyncStorage from '@react-native-async-storage/async-storage'; //done: npx expo install @react-native-async-storage/async-storage 

export default function AccessibilityScreen({navigation}) {
    const [brightness, setBrightness] = useState(1);
    const [fontSize, setFontSize] = useState(14);
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);
    const [sound, setSound] = useState();

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedSettings = await AsyncStorage.getItem('accessibilitySettings');
                if (savedSettings) {
                    const {brightness, fontSize, isSoundEnabled} = JSON.parse(savedSettings);
                    setBrightness(brightness);
                    setFontSize(fontSize);
                    setIsSoundEnabled(isSoundEnabled);
                    console.log('Loaded settings:', {brightness, fontSize, isSoundEnabled});
                }
            } catch (error) {
                console.error('Failed to load settings:', error);
            }
        };

        loadSettings();

        return sound
            ? () => {
                sound.unloadAsync(); 
            }
            : undefined;
    }, [sound]);

    const handleBrightnessChange = async (value) => {
        try {
            setBrightness(value);
            await Brightness.setBrightnessAsync(value);
        } catch (error) {
            console.error('Error setting brightness:', error);
        }
    };

    const handleSoundToggle = async (value) => {
        try {
            setIsSoundEnabled(value);
            if (value) {
                const {sound} = await Audio.Sound.createAsync(require('../../assets/click.mp3'));
                setSound(sound);
                await sound.playAsync();
            }
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };
    
    const handleSave = async () => {
        try {
            console.log('Saving settings...');
            await AsyncStorage.setItem(
                'accessibilitySettings',
                JSON.stringify({brightness, fontSize, isSoundEnabled})
            );
            console.log("Settings saved!");
            navigation.goBack();
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Brightness</Text>
            <Slider minimumValue={0.1} maximumValue={1} value={brightness} onSlidingComplete={handleBrightnessChange}/>

            <Text style={styles.label}>Font size</Text>
            <Slider minimumValue={10} maximumValue={24} value={fontSize} onSlidingComplete={setFontSize}/>
            <Text style={{fontSize: fontSize}}>Preview font size...</Text>

            <Text style={styles.label}>Sound effects</Text>
            <Switch value={isSoundEnabled} onValueChange={handleSoundToggle}/>

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