import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function ContactDetailsScreen({route, navigation}) {
    const {contact} = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{contact.name}</Text>

            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{contact.phone}</Text>

            <Text style={styles.label}>Department:</Text>
            <Text style={styles.value}>{contact.department}</Text>

            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>
                {contact.address.street}, {contact.address.city}, {contact.address.state}, {contact.address.zip}, {contact.address.country},
            </Text>

            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AddEditContact', {mode: 'edit', contact: selectedContact})}>
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 8,
    },
    contactName: {
        fontSize: 16,
        marginBottom: 8,
    },
    editButton: {
        backgroundColor: '#cb6d4f',
        padding: 16,
        position: 'absolute',
        bottom: 16,
        right: 16,
        borderRadius: 17,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});