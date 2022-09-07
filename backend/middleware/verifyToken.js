const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken');
const { generateAccessToken } = require('../functions/tokenFunctions');

/* Middleware Function to verify a user's token */
const verifyToken = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json('Access Denied');
  }

  try {
    // Verify the token is a valid token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // If token is valid, signify this by adding this "verified" variable to the "req.user" object
    req.user = verified;
    next();
  } catch (err) {
    // If token is invalid, check if there is a refresh token available
    const refreshToken = req.header('refreshToken');

    if (!refreshToken) {
      return res.status(400).json('Invalid Token');
    }

    /* Check refresh token exists in the database (i.e. is a valid refresh token) */
    const tokenExists = RefreshToken.findOne({ refreshToken: refreshToken });
    if (!tokenExists) {
      return res.status(400).json({ message: 'Refresh Token invalid' });
    }
    // Generate a new access token for the User from their provided refresh token
    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(400).json(err);
        }
        const newAccessToken = generateAccessToken(user);
        // Update the "req.user" after a new access token is granted and verified
        req.user = user;
        /* ========== Add the newly granted access token to the response ========== */
        res.newAccessToken = newAccessToken;
        next();
      });
    } catch (err) {
      return res.status(400).json({ message: 'Invalid Token', err: err });
    }
  }
};

module.exports = verifyToken;
