const MedicalInfo = require('../models/medical info');

exports.getMedicalInfo = async (req, res) => {
    try {
        // Assuming you have some way to identify the user, such as a user ID or phone number
        const { Phonenumber } = req.body; // Corrected: Access Phonenumber from req.body

        // Fetch the user's medical information from the database
        const medicalInfo = await MedicalInfo.findOne({ Phonenumber });

        if (!medicalInfo) {
            return res.status(404).json({ success: false, message: 'Medical information not found' });
        }

        // Return the medical information as JSON response
        return res.status(200).json({ success: true, medicalInfo });
    } catch (error) {
        console.error('Error fetching medical information:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
