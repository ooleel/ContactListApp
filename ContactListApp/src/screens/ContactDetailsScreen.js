import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, useWindowDimensions} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function ContactDetailsScreen({route, accessibilityStyle, navigation}) {
    const {contact} = route.params;
    console.log(navigation);
    const {width, height} = useWindowDimensions();
    const isLandscape = width > height;

    //modify here
    useFocusEffect(
        React.useCallback(() => {
            const fetchContact = async () => {
                try {
                    const response = await fetch(`http://10.0.2.2:3000/contacts/${contact.id}`); 
                    if (response.ok) {
                        const updatedContact = await response.json();
                        console.log('Fetched updated contact:', updatedContact);
                        setContacts(updatedContact) //update fetched contact in state
                    } else {
                        console.error('Failed to fetch contact:', response.status)
                    }
                } catch (error) {
                    console.error('Error fetching contact:', error); //log errors for debugging
                }
            };
            fetchContact();
        }, [contact.id]) //dependency: only when id changes
    );

    return (
        <View style={[styles.container, isLandscape && styles.landscapeContainer]}>
            <Text style={[styles.label, accessibilityStyle]}>Name:</Text>
            <Text style={[styles.value, accessibilityStyle]}>{contact.name}</Text>

            <Text style={[styles.label, accessibilityStyle]}>Phone:</Text>
            <Text style={[styles.value, accessibilityStyle]}>{contact.phone}</Text>

            <Text style={[styles.label, accessibilityStyle]}>Department:</Text>
            <Text style={[styles.value, accessibilityStyle]}>{contact.department}</Text>

            <Text style={[styles.label, accessibilityStyle]}>Address:</Text>
            <Text style={[styles.value, accessibilityStyle]}>
                {[contact.street, contact.city, contact.state, contact.zip, contact.country]
                .filter(Boolean) //removes empty/null/undefined values
                .join(', ')}
            </Text>

            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditContact', {contact})}>
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
    landscapeContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    label: {
        marginTop: 8,
        color: "#666",
    },
    value: {
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