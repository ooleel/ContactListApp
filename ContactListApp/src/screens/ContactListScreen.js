import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function ContactListScreen({navigation}) {
    const [contacts, setContacts] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Accessibility')}
                    style={styles.headerButton}
                >
                    <Text style={styles.headerButtonText}>Settings</Text>
                </TouchableOpacity>
            )
        })
    }, [navigation])

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('http://localhost:3000/contacts'); 
                const data = await response.json();
                console.log('Fetched contacts:', data);
                setContacts(data) //store fetched contacts in state
            } catch (error) {
                console.error('Error fetching contacts:', error); //log errors for debugging
            }
        };

        fetchContacts();
    }, []);


    return (
        <View style={styles.container}>
            {contacts.length === 0 ? (
            <Text style={styles.emptyMessage}>No contacts available</Text>
            ):(
            <FlatList
                data = {contacts}
                keyExtractor = {(item) => item.id.toString()}
                renderItem = {({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ContactDetails', {contact: item})}>
                        <View style={styles.contactCard}>
                            <Text style={styles.contactName}>{item.name}</Text>
                            <Text style={styles.contactPhone}>{item.phone}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            )};

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ParentNavigator', { screen: 'AddEditContact', params: { mode: 'add' } })}>
                <Text style={styles.addButtonText}>Add</Text>
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
    contactCard: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    contactName: {
        fontSize: 18,
    },
    contactPhone: {
        fontSize: 14, 
        color: '#666',
    },
    addButton: {
        backgroundColor: '#cb6d4f',
        padding: 16,
        position: 'absolute',
        bottom: 16,
        right: 16,
        borderRadius: 17,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    emptyMessage: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        color: '#888',
    },
    headerButton: {
        marginRight: 16,
    },
    headerButtonText: {
        fontSize: 16,
        color: '#cb6d4f',
    }
});