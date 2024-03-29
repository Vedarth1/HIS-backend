const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied! Token not provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.phoneNumber = decoded.phoneNumber;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            error:error
        });
    }
};

module.exports = verifyToken;
