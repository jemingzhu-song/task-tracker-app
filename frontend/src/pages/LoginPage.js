import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function LoginPage({ setToken, setRefreshToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginRequest = async () => {
    if (email === '') {
      alert('Please enter an email address');
      return;
    }
    if (password === '') {
      alert('Please enter a password');
      return;
    }
    if (!validateEmail(email)) {
      alert('Email is invalid. Enter a valid email');
      return;
    }

    const loginDetails = {
      email: email,
      password: password,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(loginDetails),
    };

    const response = await fetch('/auth/login', requestOptions);

    if (response.status === 400) {
      const data = await response.json();
      alert(data.message);
    } else if (response.status === 404) {
      alert('/auth/login Fetch Failed');
    } else if (response.status === 200) {
      const res = await response.json();
      const data = res.data;
      console.log(data);
      setToken(data.token);
      setRefreshToken(data.refreshToken);
      navigate('/');
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  // Helper Functions
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
      <Typography variant='h4'>Login</Typography>
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
      <Button color='inherit' sx={{ margin: '6px 0', textTransform: 'none' }} onClick={loginRequest}>
        <Typography variant='body1'>Login</Typography>
      </Button>
    </Box>
  );
}

LoginPage.propTypes = {
  setToken: PropTypes.func,
  setRefreshToken: PropTypes.func,
};

export default LoginPage;
