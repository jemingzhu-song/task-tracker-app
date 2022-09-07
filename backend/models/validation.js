/* Modules */
const Joi = require('joi');

/* "auth" Routes */
// Joi Schema to validate for a "User" object when they REGISTER
const registerValidation = Joi.object({
  firstName: Joi.string().min(1).max(255).required(),
  lastName: Joi.string().min(1).max(255).required(),
  email: Joi.string().min(1).max(255).required(),
  password: Joi.string().required(),
});

// Joi Schema to validate for a "User" object when they LOGIN
const loginValidation = Joi.object({
  email: Joi.string().min(1).max(255).required(),
  password: Joi.string().required(),
});

// Joi Schema to validate for a "RefreshToken" object when a user REMOVES A TASK
const refreshTokenValidation = Joi.object({
  refreshToken: Joi.string().required(),
});

/* "account" Routes */
// Joi Schema to validate for a "User" object when they EDIT ACCOUNT DETAILS
const accountDetailsEditValidation = Joi.object({
  firstName: Joi.string().min(1).max(255).required(),
  lastName: Joi.string().min(1).max(255).required(),
  email: Joi.string().min(1).max(255).required(),
  password: Joi.string().required(),
});

/* "tasks" Routes */
// Joi Schema to validate for a "Task" object when a user CREATES A TASK
const taskCreateValidation = Joi.object({
  description: Joi.string().min(1).max(255).required(),
  status: Joi.string().min(1).max(255).required(),
});

// Joi Schema to validate for a "Task" object when a user EDITS A TASK
const taskEditValidation = Joi.object({
  taskId: Joi.string().required(),
  description: Joi.string().min(1).max(255).required(),
  status: Joi.string().min(1).max(255).required(),
});

// Joi Schema to validate for a "Task" object when a user REMOVES A TASK
const taskRemoveValidation = Joi.object({
  taskId: Joi.string().required(),
});

module.exports = {
  registerValidation: registerValidation,
  loginValidation: loginValidation,
  accountDetailsEditValidation: accountDetailsEditValidation,
  taskCreateValidation: taskCreateValidation,
  taskEditValidation: taskEditValidation,
  taskRemoveValidation: taskRemoveValidation,
  refreshTokenValidation: refreshTokenValidation,
};
