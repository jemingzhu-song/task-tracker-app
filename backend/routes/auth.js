/* Modules */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { generateAccessToken, generateRefreshToken } = require('../functions/tokenFunctions');
const { sendResponseJSON } = require('../functions/responseFunctions');
const verifyToken = require('../middleware/verifyToken');

/* Models */
const User = require('../models/User');

/* Model Validation */
const { registerValidation, loginValidation, refreshTokenValidation } = require('../models/validation');
const RefreshToken = require('../models/RefreshToken');

/* Routes */
router.post('/register', async (req, res) => {
  console.log('Register Request');
  const { firstName, lastName, email, password } = req.body;

  /* Validate input data */
  const { error } = registerValidation.validate(req.body);
  if (error) {
    return sendResponseJSON(res, 400, error.details[0].message);
  }

  /* Check if user already exists in the database */
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    sendResponseJSON(
      res,
      400,
      'Email already taken. Please try a different email, or login with this existing email'
    );
  }

  /* Hash passwords */
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  /* Save user in database */
  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    sendResponseJSON(res, 200, savedUser);
  } catch (err) {
    sendResponseJSON(res, 400, err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  /* Validate input data */
  const { error } = loginValidation.validate(req.body);
  if (error) {
    return sendResponseJSON(res, 400, error.details[0].message);
  }

  /* Check that user is valid */
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
    return sendResponseJSON(res, 400, 'Email or password is incorrect');
  }

  /* Check password is correct */
  const validPassword = await bcrypt.compare(password, foundUser.password);
  if (!validPassword) {
    return sendResponseJSON(res, 400, 'Incorrect password');
  }
  /* Successful Login - generate JWT Token */
  const token = generateAccessToken(foundUser);
  /* Successful Login - generate JWT Refresh Token */
  const refreshToken = await generateRefreshToken(foundUser);
  res.header('auth-token', token);
  sendResponseJSON(res, 200, { token: token, refreshToken: refreshToken });
});

// Remove the User's refresh token from the database when they log out.
router.delete('/token', verifyToken, async (req, res) => {
  const refreshToken = req.header('refreshToken');
  /* Remove the refresh token from the database */
  try {
    const removedRefreshToken = await RefreshToken.findOneAndRemove({ refreshToken: refreshToken });
    sendResponseJSON(res, 200, removedRefreshToken);
  } catch (err) {
    sendResponseJSON(res, 400, err);
  }
});

module.exports = router;
