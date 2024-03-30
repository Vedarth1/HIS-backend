const express = require('express');
const Contacts = require('../models/contact');

exports.addcontact = async (req, res) => {
    try {
        // Extract name and phoneNumber from the request body
        const { name, phoneNumber } = req.body;

        // Create a new contact instance
        const newContact = new Contacts({
            name,
            phoneNumber
        });

        // Save the new contact to the database
        const savedContact = await newContact.save();

        // Return the saved contact as JSON response
        res.status(201).json(savedContact);
    } catch (err) {
        console.error('Error adding contact:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}