import React from 'react';
import {useState} from 'react';
import {View, TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function AddEditContactScreen(props) {
    //add or edit mode
    //debugger;
    let mode = '';
    let contact = {};
    if(props) {
        mode = props.route.params.editMode;
        contact = props.route.params.contact;
    }

    //form fields states using default values or empty strings
    const [staff, setStaff] = useState({
         name: contact.name,
         phone: contact.phone,
         department: contact.department,
         street: contact.street,
         city: contact.city,
         state: contact.state,
         zip: contact.zip,
         country: contact.country
    });
    
    const handleSave = () => {
        //save logic for add or edit
        if (mode === 'add') {
            //new contact
            console.log('Adding contact:', staff);
        } else if (mode === 'edit') {
            //update existing contact
            console.log('Editing contact:', staff);
        }
        navigation.goBack(); //navigate back after saving
    };

    //🚩 ADD DROPDOWNS for departments and states
    return (
        <View styles={styles.container}>
            <Text style={styles.title}>{mode === 'add' ? 'Add Contact' 
            : 'Edit Contact'}</Text>

            <Text style={styles.label}>Name:</Text>
            <TextInput style={styles.input} placeholder="Name" value={staff.name} />

            <Text style={styles.label}>Phone:</Text>
            <TextInput style={styles.input} placeholder="Phone" value={staff.phone} />

            <Text style={styles.label}>Department:</Text>
            <TextInput style={styles.input} placeholder="Department" value={staff.department} />

            <Text style={styles.label}>Address:</Text>
            <TextInput style={styles.input} placeholder="Street" value={staff.street} /> 
            <TextInput style={styles.input} placeholder="City" value={staff.city} /> 
            <TextInput style={styles.input} placeholder="State" value={staff.state} /> 
            <TextInput style={styles.input} placeholder="ZIP" value={staff.zip} /> 
            <TextInput style={styles.input} placeholder="Country" value={staff.country} /> 

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