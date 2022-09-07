/* Modules */
const express = require('express');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();
const { sendResponseJSON } = require('../functions/responseFunctions');

/* Models */
const User = require('../models/User');
const Task = require('../models/Task');

/* Model Validation */
const { taskCreateValidation, taskEditValidation, taskRemoveValidation } = require('../models/validation');
const { default: mongoose } = require('mongoose');

/* Middleware */
router.use(verifyToken);

/* Routes */
router.get('/all', async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    const tasks = user.tasks;
    sendResponseJSON(res, 200, tasks);
  } catch (err) {
    sendResponseJSON(res, 400, err);
  }
});

router.post('/', async (req, res) => {
  const userId = req.user._id;
  const { description, status } = req.body;

  /* Validate input data */
  const { error } = taskCreateValidation.validate(req.body);
  if (error) {
    return sendResponseJSON(res, 400, error.details[0].message);
  }

  /* Save task in database */
  try {
    const user = await User.findById(userId);
    const newTask = new Task({ description: description, status: status });
    user.tasks.push(newTask);
    user.save();
    res.json(newTask);
    sendResponseJSON(res, 200, newTask);
  } catch (err) {
    sendResponseJSON(res, 400, err);
  }
});

router.put('/', async (req, res) => {
  const userId = req.user._id;
  const { taskId, description, status } = req.body;

  /* Validate input data */
  const { error } = taskEditValidation.validate(req.body);
  if (error) {
    return sendResponseJSON(res, 400, error.details[0].message);
  }

  /* Modify task in database */
  try {
    const taskIdObject = new mongoose.Types.ObjectId(taskId);
    const modifiedTask = await User.updateOne(
      { _id: userId, 'tasks._id': taskIdObject },
      { $set: { 'tasks.$.description': description, 'tasks.$.status': status } }
    );
    sendResponseJSON(res, 200, modifiedTask);
  } catch (err) {
    sendResponseJSON(res, 400, err);
  }
});

router.delete('/', async (req, res) => {
  const { taskId } = req.body;

  /* Validate input data */
  const { error } = taskRemoveValidation.validate(req.body);
  if (error) {
    return sendResponseJSON(res, 400, error.details[0].message);
  }

  /* Remove task from database */
  try {
    const taskIdObject = new mongoose.Types.ObjectId(taskId);
    const removedTask = await User.updateOne({}, { $pull: { tasks: { _id: taskIdObject } } });
    sendResponseJSON(res, 200, removedTask);
  } catch (err) {
    sendResponseJSON(res, 400, err);
  }
});

module.exports = router;
