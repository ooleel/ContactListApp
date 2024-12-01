import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function AddContactScreen({navigation}) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');

    const handleAddContact = async() => {
        const payload = {name, phone, department, street, city, state, zip, country,};

        console.log('Sending Payload:', payload); //debugging: log payload

        try {
            const response = await fetch('http://localhost:3000/contacts', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({payload}),
            });

            if (response.ok) {
                const newContact = await response.json();
                console.log('Contact added:', newContact);
                navigation.goBack(); //previous screen (ContactList)
            } else {
                console.error('Failed to add contact.');
            }
        } catch (error) {
            console.error('An error occured when adding contact:');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name: </Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name"/>

            <Text style={styles.label}>Phone: </Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone"/>

            <Text style={styles.label}>Department: </Text>
            <TextInput style={styles.input} value={department} onChangeText={setDepartment} placeholder="Department"/>

            <Text style={styles.label}>Street: </Text>
            <TextInput style={styles.input} value={street} onChangeText={setStreet} placeholder="Street"/>

            <Text style={styles.label}>City: </Text>
            <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="City"/>

            <Text style={styles.label}>State: </Text>
            <TextInput style={styles.input} value={state} onChangeText={setState} placeholder="State"/>

            <Text style={styles.label}>ZIP: </Text>
            <TextInput style={styles.input} value={zip} onChangeText={setZip} placeholder="ZIP"/>

            <Text style={styles.label}>Country: </Text>
            <TextInput style={styles.input} value={country} onChangeText={setCountry} placeholder="Country"/>

            <TouchableOpacity style={styles.saveButton} onPress={handleAddContact}>
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
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        marginBottom: 16, 
        borderRadius: 4,
    },
    saveButton: {
        backgroundColor: '#941a1d',
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