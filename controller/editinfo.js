const MedicalInfo = require('../models/medical info');

exports.editMedicalInfo = async (req, res) => {
    try {
        const { Phonenumber, updatedInfo } = req.body;

        // Find the medical information document by Phonenumber
        let medicalInfo = await MedicalInfo.findOne({ Phonenumber });

        // If medicalInfo document doesn't exist, create a new one
        if (!medicalInfo) {
            medicalInfo = new MedicalInfo({
                Phonenumber,
                ...updatedInfo
            });
        } else {
            // If medicalInfo document exists, update the fields with the new data
            medicalInfo.set(updatedInfo);
        }

        // Save the updated medical information
        await medicalInfo.save();

        return res.status(200).json({ success: true, message: 'Medical information updated successfully' });
    } catch (error) {
        console.error('Error updating medical information:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
