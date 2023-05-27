const User = require('../models/User');
const Subscriber = require('../models/Subscriber');

// Sign up controller
exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Generate and return JWT token
    const token = newUser.getJwtToken();

    const options = {
      expires: new Date(Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      newUser,
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Sign in controller
exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate the password
    const isPasswordValid = await user.isValidatedPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate and return JWT token
    const token = user.getJwtToken();
    const options = {
      expires: new Date(Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      // If the subscriber already exists, update isActive to true
      subscriber.isActive = true;
    } else {
      // If the subscriber doesn't exist, create a new subscriber
      subscriber = new Subscriber({ email });
    }

    await subscriber.save();

    res.status(200).json({ success: true, message: 'Subscription updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while updating the subscription' });
  }
};

