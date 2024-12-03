import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function EditContactScreen({route, navigation}) {
    const {contact} = route.params;
    const [name, setName] = useState(contact.name);
    const [phone, setPhone] = useState(contact.phone);
    const [department, setDepartment] = useState(contact.department || '');
    const [street, setStreet] = useState(contact.street || '');
    const [city, setCity] = useState(contact.city || '');
    const [state, setState] = useState(contact.state || '');
    const [zip, setZip] = useState(contact.zip || '');
    const [country, setCountry] = useState(contact.country || '');

    const handleEditContact = async() => {
        try {
            const response = await fetch(`http://localhost:3000/contacts/${contact.id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: contact.id, name, phone, department, street, city, state, zip, country,
                }),
            });

            if (response.ok) {
                const updatedContact = await response.json();
                console.log('Contact updated:', updatedContact);
                navigation.goBack(); //previous screen (ContactDetails)
            } else {
                console.error('Failed to update contact.');
            }
        } catch (error) {
            console.error('An error occured when updating contact:');
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

            <TouchableOpacity style={styles.saveButton} onPress={handleEditContact}>
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