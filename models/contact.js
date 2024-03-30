const mongoose = require('mongoose');

// Define the schema for the Contact model
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
