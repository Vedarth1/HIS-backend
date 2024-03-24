const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    otpExpiration: {
        type: Date,
        default: () => new Date(Date.now() + 5 * 60 * 1000) // Set expiration to 5 minutes from now
    }
});

module.exports = mongoose.model('Otp', otpSchema);
