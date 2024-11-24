import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

export default function AddEditContactScreen({route, navigation}) {
    const {mode, contact} = route.params || {};
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
        navigation.goBack();
    };

    //🚩 ADD DROPDOWNS for departments and states
    return (
        <View styles = {styles.container}>
            <Text style = {styles.label}>Name:</Text>
            <TextInput style = {styles.input} placeholder="Name" value={name} onChangeText={setName}>{contact.name}</TextInput>

            <Text style = {styles.label}>Phone:</Text>
            <TextInput style = {styles.input} placeholder="Phone" value={phone} onChangeText={setPhone}>{contact.phone}</TextInput>

            <Text style = {styles.label}>Department:</Text>
            <TextInput style = {styles.input} placeholder="Name" value={name} onChangeText={setName}>{contact.department}</TextInput>

            <Text style = {styles.label}>Address:</Text>
            <TextInput style = {styles.input} placeholder="Street" value={street} onChangeText={setStreet}>{contact.address.department}</TextInput>
            <TextInput style = {styles.input} placeholder="City" value={city} onChangeText={setCity}>{contact.address.city}</TextInput>
            <TextInput style = {styles.input} placeholder="State" value={state} onChangeText={setState}>{contact.address.state}</TextInput>
            <TextInput style = {styles.input} placeholder="ZIP" value={zip} onChangeText={setZip}>{contact.address.zip}</TextInput>
            <TextInput style = {styles.input} placeholder="Country" value={country} onChangeText={setCountry}>{contact.address.country}</TextInput>

            <Button title="Save" onPress={handleSave}/>
        </View>
    );
}

//🚩 Add styling labels + DROPDOWNS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }, 
    //labels
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        marginBottom: 16, 
        borderRadius: 4,
    }
});