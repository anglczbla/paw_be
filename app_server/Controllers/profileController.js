// const User = require('../models/User');
// const Profile = require("../models/profile");


// Get profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.render('profile', { user });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    );
    res.redirect('/profile');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// ini ada 2 profileController nya seng ?
// yg bner yg mana
 // yg difolder app_api
 // app_server masih kepake ? kalo engga apus aja 
 // kata tmn ku si kepake 