exports.otpVerification = async (otpTime) => {
    try {
        // Check if otpTime is a valid date representation
        if (!(otpTime instanceof Date && !isNaN(otpTime))) {
            throw new Error('Invalid OTP time provided');
        }

        console.log('Received OTP time:', otpTime);

        const currentTime = new Date();
        const differenceMilliseconds = otpTime.getTime() - currentTime.getTime();
        const differenceMinutes =differenceMilliseconds / (1000 * 60);

        console.log('Milliseconds difference:', differenceMilliseconds);
        console.log('Minutes difference:', differenceMinutes);

        // Check if OTP is valid for more than 2 minutes
        return differenceMinutes > 0;
    } catch (error) {
        console.error('Error in otpVerification:', error);
        return false; // Return false in case of error
    }
};
