import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function RegisterPage({ setToken }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const registerRequest = async () => {
    if (!validationChecks(firstName, lastName, email, password, confirmPassword)) {
      return;
    }

    const registerDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(registerDetails),
    };

    const response = await fetch('/auth/register', requestOptions);

    if (response.status === 400) {
      const data = await response.json();
      alert(data.message);
    } else if (response.status === 404) {
      alert('/auth/login Fetch Failed');
    } else if (response.status === 200) {
      const res = await response.json();
      const data = res.data;
      setToken(data.token);
      navigate('/login');
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  // Helper Functions
  const validationChecks = (firstName, lastName, email, password, confirmPassword) => {
    if (firstName === '') {
      alert('Please enter first name');
      return false;
    }
    if (lastName === '') {
      alert('Please enter first name');
      return false;
    }
    if (email === '') {
      alert('Please enter an email address');
      return false;
    }
    if (password === '') {
      alert('Please enter a password');
      return false;
    }
    if (confirmPassword === '') {
      alert('Please confirm your password');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match. Try again');
      return false;
    }
    if (!validateEmail) {
      alert('Email is invalid. Enter a valid email');
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '60px 0',
      }}
    >
      <Typography variant='h4'>Register</Typography>
      <TextField
        sx={{ width: '360px', margin: '6px 0' }}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        id='standard-basic'
        label='First Name'
        variant='standard'
        color='secondary'
      />
      <TextField
        sx={{ width: '360px', margin: '6px 0' }}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        id='standard-basic'
        label='Last Name'
        variant='standard'
        color='secondary'
      />
      <TextField
        sx={{ width: '360px', margin: '6px 0' }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id='standard-basic'
        label='Email'
        variant='standard'
        color='secondary'
      />
      <TextField
        sx={{ width: '360px', margin: '6px 0' }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id='standard-basic'
        label='Password'
        variant='standard'
        type='password'
        color='secondary'
      />
      <TextField
        sx={{ width: '360px', margin: '6px 0' }}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        id='standard-basic'
        label='Confirm Password'
        variant='standard'
        type='password'
        color='secondary'
      />
      <Button color='inherit' sx={{ margin: '6px 0', textTransform: 'none' }} onClick={registerRequest}>
        <Typography variant='body1'>Register</Typography>
      </Button>
    </Box>
  );
}

RegisterPage.propTypes = {
  setToken: PropTypes.func,
};

export default RegisterPage;
