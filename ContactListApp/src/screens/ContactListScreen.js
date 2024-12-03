import React, {useState, useLayoutEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet, useWindowDimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export default function ContactListScreen({navigation}) {
    const [contacts, setContacts] = useState([]);
    const {width, height} = useWindowDimensions();
    const isLandscape = width > height;

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

    useFocusEffect(
        React.useCallback(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('http://localhost:3000/contacts'); //http://localhost:3000/contacts or http://10.0.2.2:3000/contacts (android emulator) 
                const data = await response.json();
                console.log('Fetched contacts:', data);
                setContacts(data) //store fetched contacts in state
            } catch (error) {
                console.error('Error fetching contacts:', error); //log errors for debugging
            }
        };

        fetchContacts();
        }, [])
    );

    return (
        <View style={[styles.container, isLandscape && styles.landscapeContainer]}>
            {contacts.length === 0 ? (
            <Text style={styles.emptyMessage}>No contacts available</Text>
            ):(
            <FlatList
                data = {contacts}
                keyExtractor = {(item) => item.id.toString()}
                numColumns={isLandscape ? 2 : 1} //2 columns of contacts in landscape mode
                renderItem = {({item}) => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('ContactDetails', {contact: item})}
                        style={[styles.contactCard, isLandscape && styles.landscapeCard]}
                    >
                        <Text style={styles.contactName}>{item.name}</Text>
                        <Text style={styles.contactPhone}>{item.phone}</Text>
                    </TouchableOpacity>
                )}
            />
            )};

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddContact')}>
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
    landscapeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    contactCard: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    landscapeCard: {
        width: '50%', 
        marginHorizontal: '1%',
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