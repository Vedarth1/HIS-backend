const mongoose = require('mongoose');

const medicalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    ongoingMedications: {
        type: [String]
    },
    medicalHistory: {
        type: String
    },
    allergies: {
        type: [String]
    },
    height: {
        type: Number,
        min: 0 
    },
    weight: {
        type: Number,
        min: 0
    },
    isOrganDonor: {
        type: Boolean,
        default: false
    },
    familyDoctorPhoneNo: {
        type: String
    },
    contacts: {
        type: [
            {
                name: String,
                phoneNo: String,
                isverified:{
                    type:Boolean,
                    default:false
                }
            }
        ]
    }
});

module.exports = mongoose.model('medicalinfo', medicalSchema);
