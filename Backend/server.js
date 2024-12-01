const express = require('express');
const cors = require('cors'); //communication between React Native and backend
const app = express();
const PORT = 3000;

    //DATA
//🚩 add contacts!!!!!
let contacts = [
        {
            id: '1', 
            name: 'John Smith', 
            phone: '02 9988 2211',
            department: 'Information Communications Technology',
            street: '1 Code Lane',
            city: 'Javaville',
            state: 'NSW',
            zip: '0100',
            country: 'Australia'
        },
        {
            id: '2', 
            name: 'Sue White', 
            phone: '03 8899 2255',
            department: 'Finance',
            street: '16 Bit Way',
            city: 'Byte Cove',
            state: 'QLD',
            zip: '1101',
            country: 'Australia'
        },
    ];

    //MIDDLEWARE
app.use(cors());
app.use(express.json());

    //ROUTES
//get all contacts
app.get('/contacts', (req, res) => {
    res.json(contacts);
});

//add new contact
app.post('/contacts', (req, res) => {
    const { name, phone, department, street, city, state, zip, country} = req.body;

    //validate required fields
    if (!name || !phone) {
        return res.status(400).json({ error: 'Name and phone are required.'});
    }

    const newContact = {
        id: contact.length > 0 ? contact[contacts.length - 1].id + 1 : 1, //new id
        name, 
        phone, 
        department: department || '', //default to empty if not provided
        address: {
            street: street || '',
            city: city || '',
            state: state || '',
            zip: zip || '',
            country: country || '',
        },
    };

    contacts.push(newContact);
    res.status(201).json(newContact);
});

//edit existing contact
app.post('/contacts/:id', (req, res) => { 
    const {id} = req.params;
    const { name, phone, department, street, city, state, zip, country} = req.body;

    //validate required fields
    if (!name || !phone) {
        return res.status(400).json({error: 'Name and phone are required.'});
    }

    const contactIndex = contacts.findIndex((c) => c.id === parseInt(id, 10));

    if (contactIndex === -1) {
        return res.status(404).json({error: 'Contact not found'});
    }

    //update contact
    contact[contactIndex] = {
        ...contacts[contactIndex],
        name, 
        phone, 
        department, 
        address: {
            street,
            city,
            state,
            zip,
            country,
        },
    }

    res.json(contacts[contactIndex]);
});

app.listen(PORT, function() {
    console.log(`Server is now running at http://localhost:${PORT}`);
});