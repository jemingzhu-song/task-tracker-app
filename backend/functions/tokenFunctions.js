const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken');
const { refreshTokenValidation } = require('../models/validation');

const generateAccessToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '10s' });
};

const generateRefreshToken = async (user) => {
  /* Generate refresh token */
  const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);
  /* Store the refresh token in the database */
  const { error } = refreshTokenValidation.validate({ refreshToken });
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  /* Save refreshToken in database */
  const newRefreshToken = new RefreshToken({
    refreshToken: refreshToken,
  });

  try {
    const savedRefreshToken = await newRefreshToken.save();
    return refreshToken;
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports = {
  generateAccessToken: generateAccessToken,
  generateRefreshToken: generateRefreshToken,
};
