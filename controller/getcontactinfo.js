// Import necessary modules
const express = require('express');
const Contacts = require('../models/contact'); // Import the Contact model

// Controller to list contacts from the database
exports.Contact=async(req,res)=>{
    try {
        // Fetch all contacts from the database
        const contacts = await Contacts.find();

        // Return the contacts as JSON response
        res.status(200).json({ contacts: contacts });
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
