const { response } = require('express');

const sendResponseJSON = (res, status, responseBody) => {
  const newAccessToken = res.newAccessToken;
  if (newAccessToken) {
    return res.status(status).json({ data: responseBody, newAccessToken: newAccessToken });
  } else {
    return res.status(status).json({ data: responseBody });
  }
};

module.exports = {
  sendResponseJSON: sendResponseJSON,
};
