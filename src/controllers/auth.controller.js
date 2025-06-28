const User = require('../models/user.model');

// Render login page
exports.getLoginPage = (req, res) => {
  res.render('auth/login');
};

// Render register page
exports.getRegisterPage = (req, res) => {
  res.render('auth/register');
};

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.render('auth/register', {
        error: 'User with that email or username already exists',
        values: req.body
      });
    }
    
    // Create new user
    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName
    });
    
    await user.save();
    
    // Store user in session without password
    req.session.user = user.toJSON();
    
    res.redirect('/dashboard');
  } catch (error) {
    next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.render('auth/login', {
        error: 'Invalid username or password',
        values: req.body
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('auth/login', {
        error: 'Invalid username or password',
        values: req.body
      });
    }
    
    // Store user in session without password
    req.session.user = user.toJSON();
    
    // Redirect to intended page or dashboard
    const redirectUrl = req.session.returnTo || '/dashboard';
    delete req.session.returnTo;
    
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

// Logout user
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
};