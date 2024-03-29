const medicalinfo = require("../models/medical info");

exports.info = async (request, response) => {
    try {
        const {
            name,
            bloodGroup,
            age,
            ongoingMedications,
            medicalHistory,
            allergies,
            height,
            weight,
            isOrganDonor,
            familyDoctorPhoneNo,
            contacts
        } = request.body;

        // Create a new instance of the medicalinfo model with the provided data
        const newMedicalInfo = new medicalinfo({
            name,
            bloodGroup,
            age,
            ongoingMedications,
            medicalHistory,
            allergies,
            height,
            weight,
            isOrganDonor,
            familyDoctorPhoneNo,
            contacts
        });

        // Save the new medical form entry to the database
        const savedMedicalInfo = await newMedicalInfo.save();

        response.status(201).json({ success: true, message: 'Medical form information saved successfully', data: savedMedicalInfo });
    } catch (error) {
        console.error('Error saving medical form information:', error);
        response.status(500).json({ success: false, message: 'Internal server error' });
    }
}
