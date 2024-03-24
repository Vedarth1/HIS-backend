const Otpmodel = require('../models/otp');
const otpgenerator = require('otp-generator');
const axios = require("axios");
const twilio = require('twilio');
const { otpVerification } = require('../helper/otpValidate');

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const url = process.env.TWILIO_URL;

const twilioClient = new twilio(accountSID, authToken);
const client = require('twilio')(accountSID, authToken);

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

        return res.status(200).json({
            success: true,
            msg: 'otp sent successfully'
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
                message: 'You entered wrong otp'
            });
        }

        const isotpexpired = await otpVerification(otpdata.otpExpiration);
        if (!isotpexpired) {
            return res.status(400).json({
                success: false,
                message: 'otp expired'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'otp verified'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

exports.whatsappcurrentlocation = async (req, res) => {
    const messageBody = {
        Body: "Twilio HQ",
        From: "whatsapp:+14155238886",
        PersistentAction: "geo:37.787890,-122.391664",//add current location from frontend
        To: "whatsapp:+919579322809"
    };

    axios.post(url, new URLSearchParams(messageBody), {
        auth: {
            username: accountSID,
            password: authToken
        }
    })
    .then(
        response => {
            console.log(response.data.sid);
            return res.status(200).json({
                success: true,
                msg: 'location send!'
            });
        },
        error => {
            console.log(error);
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    );
}
