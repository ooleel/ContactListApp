import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function AddEditContactScreen({route, navigation}) {
    //add or edit mode
    const {mode, contact = {}} = route.params || {}; //default value for contact if not provided

    //form fields states using default values or empty strings
    const [name, setName] = useState(contact?.name || ''); 
    const [phone, setPhone] = useState(contact?.phone || ''); 
    const [department, setDepartment] = useState(contact?.department || ''); 
    const [street, setStreet] = useState(contact?.address.street || ''); 
    const [city, setCity] = useState(contact?.address.city || ''); 
    const [state, setState] = useState(contact?.address.state || ''); 
    const [zip, setZip] = useState(contact?.address.zip || ''); 
    const [country, setCountry] = useState(contact?.address.country || '');
    
    const handleSave = () => {
        //save logic for add or edit
        if (mode === 'add') {
            //new contact
            console.log('Adding contact:', {name, phone, department, street, city, state, zip, country});
        } else if (mode === 'edit') {
            //update existing contact
            console.log('Editing contact:', {name, phone, department, street, city, state, zip, country});
        }
        navigation.goBack(); //navigate back after saving
    };

    //🚩 ADD DROPDOWNS for departments and states
    return (
        <View styles={styles.container}>
            <Text style={styles.title}>{mode === 'add' ? 'Add Contact' : 'Edit Contact'}</Text>

            <Text style={styles.label}>Name:</Text>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName}>{contact.name}</TextInput>

            <Text style={styles.label}>Phone:</Text>
            <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone}>{contact.phone}</TextInput>

            <Text style={styles.label}>Department:</Text>
            <TextInput style={styles.input} placeholder="Department" value={department} onChangeText={setDepartment}>{contact.department}</TextInput>

            <Text style={styles.label}>Address:</Text>
            <TextInput style={styles.input} placeholder="Street" value={street} onChangeText={setStreet}>{contact.address.department}</TextInput>
            <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity}>{contact.address.city}</TextInput>
            <TextInput style={styles.input} placeholder="State" value={state} onChangeText={setState}>{contact.address.state}</TextInput>
            <TextInput style={styles.input} placeholder="ZIP" value={zip} onChangeText={setZip}>{contact.address.zip}</TextInput>
            <TextInput style={styles.input} placeholder="Country" value={country} onChangeText={setCountry}>{contact.address.country}</TextInput>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.SaveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

//🚩 Add styling DROPDOWNS
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
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        marginBottom: 16, 
        borderRadius: 4,
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