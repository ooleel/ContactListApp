import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import {View, Switch, StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function AccessibilityScreen({route, navigation}) {
    const [brightness, setBrightness] = useState(1);
    const [fontSize, setFontSize] = useState(2);
    
    const handleSave = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Slider minimumValue={0.1} maximumValue={1} value={brightness} onValueChange={setBrightness}/>
            <Slider minimumValue={10} maximumValue={24} value={fontSize} onValueChange={setFontSize}/>
            <Switch value={false}/>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.SaveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }, 
    title: {
        color: '#941a1d',
        fontSize: 30,
        textAlign: 'center',
    },
    label: {
        fontSize: 12,
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