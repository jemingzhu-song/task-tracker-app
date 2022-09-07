/* Modules */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const taskRoutes = require('./routes/task');

const app = express();

/* Connect to MongoDB */
dotenv.config();
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('Connected to MongoDB...');
});

/* Middleware */
app.use(express.json());

/* Routes */
app.use('/auth', authRoutes);
app.use('/account', accountRoutes);
app.use('/task', taskRoutes);

app.listen(5050, () => {
  console.log('Server Started on Port 5050...');
});
