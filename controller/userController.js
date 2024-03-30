const Otpmodel = require('../models/otp');
const otpgenerator = require('otp-generator');
const axios = require("axios");
const twilio = require('twilio');
const { otpVerification } = require('../helper/otpValidate');
const jwt = require('jsonwebtoken');

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const url = process.env.TWILIO_URL;

const twilioClient = new twilio(accountSID, authToken);
const client = require('twilio')(accountSID, authToken);

// Function to generate JWT token
const generateToken = (phoneNumber) => {
    return jwt.sign({ phoneNumber }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Token expires in 7 days
};

exports.sendotp = async (req, res) => {
    try {
        const { PhoneNumber } = req.body;

        const otp = otpgenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        // Set the OTP expiration time to 5 minutes from now
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);

        await Otpmodel.findOneAndUpdate(
            { phoneNumber: PhoneNumber },
            { otp: otp, otpExpiration: otpExpiration },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        twilioClient.messages.create({
            body: `Your OTP is : ${otp}`,
            to: PhoneNumber,
            from: process.env.TWILIO_PHONENUMBER
        });

        // Generate JWT token
        const token = generateToken(PhoneNumber);

        return res.status(200).json({
            success: true,
            token: token,
            msg: 'otp sent successfully!!!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

exports.verifyotp = async (req, res) => {
    try {
        const { PhoneNumber, otp } = req.body;

        const otpdata = await Otpmodel.findOne({
            phoneNumber: PhoneNumber,
            otp: otp
        });

        if (!otpdata) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        const isotpexpired = await otpVerification(otpdata.otpExpiration);
        if (!isotpexpired) {
            return res.status(400).json({
                success: false,
                message: 'OTP expired'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'OTP verified successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
