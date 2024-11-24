import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ContactDetailsScreen({route}) {
    const {contact} = route.params;

    return (
        <View style = {styles.container}>
            <Text style = {styles.label}>Name:</Text>
            <Text style = {styles.value}>{contact.name}</Text>

            <Text style = {styles.label}>Phone:</Text>
            <Text style = {styles.value}>{contact.phone}</Text>

            <Text style = {styles.label}>Department:</Text>
            <Text style = {styles.value}>{contact.department}</Text>

            <Text style = {styles.label}>Address:</Text>
            <Text style = {styles.value}>
                {contact.address.street}, {contact.address.city}, {contact.address.state}, {contact.address.zip}, {contact.address.country},
            </Text>
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
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    contactName: {
        fontSize: 16,
        marginBottom: 8,
    },
});