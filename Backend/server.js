const express = require('express');
const cors = require('cors'); //communication between React Native and backend
const PORT = 3000;

app.use(cors());
app.use(express.json());

//data 
//🚩 add contacts!!!!!
let contacts = [
        {
            id: '1', 
            name: 'John Smith', 
            phone: '02 9988 2211',
            department: 'Information Communications Technology',
            address: {
                street: '1 Code Lane',
                city: 'Javaville',
                state: 'NSW',
                zip: '0100',
                country: 'Australia'
            }
        },
        {
            id: '2', 
            name: 'Sue White', 
            phone: '03 8899 2255',
            department: 'Finance',
            address: {
                street: '16 Bit Way',
                city: 'Byte Cove',
                state: 'QLD',
                zip: '1101',
                country: 'Australia'
            },
        },
    ];

//routes
app.get('/contacts', (req, res) => {
    res.json(contacts);
});

app.post('/contacts', (req, res) => {
    const newContact = {id: contacts.length + 1, ...req.body};
    contacts.push(newContact);
    res.status(201).json(newContact);
});

app.post('/contacts/:id', (req, res) => { 
    const {id} = req.params;
    const {name, phone} = req.body;
    const contact = contacts.find((c) => c.id === parseInt(id));

    if (!contact) {
        return res.status(404).json({error: 'Contact not found'});
    }

    contact.name = name;
    contact.phone = phone;
    res.json(contact);
});

app.listen(PORT, function() {
    console.log(`Server is now running at http://localhost:${PORT}`);
});