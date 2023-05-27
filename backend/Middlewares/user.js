const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// Middleware to check if user is logged in
exports.isLoggedIn = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token =
        req.cookies?.token ||
        req.body?.token ||
        req?.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user object to the request
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
