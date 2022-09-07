/* Modules */
const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const bcrypt = require('bcryptjs');
const { sendResponseJSON } = require('../functions/responseFunctions');
const router = express.Router();

/* Models */
const User = require('../models/User');

/* Model Validation */
const { accountDetailsEditValidation } = require('../models/validation');

/* Middleware */
router.use(verifyToken);

/* Routes */
router.get('/details', async (req, res) => {
  const userId = req.user._id;
  // Retrieve user details from the database
  try {
    const user = await User.findById(userId);
    sendResponseJSON(res, 200, user);
  } catch (err) {
    sendResponseJSON(res, 400, err);
  }
});

router.put('/details', async (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName, email, password } = req.body;
  // Edit user details in the database
  try {
    let updateBlock = {};
    if (firstName) {
      updateBlock.firstName = firstName;
    }
    if (lastName) {
      updateBlock.lastName = lastName;
    }
    if (email) {
      updateBlock.email = email;
    }
    if (password) {
      /* Hash passwords */
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateBlock.password = hashedPassword;
    }

    const updatedUser = await User.updateOne({ _id: userId }, updateBlock);
    sendResponseJSON(res, 200, updatedUser);
  } catch (err) {
    sendResponseJSON(res, 400, err);
  }
});

module.exports = router;
