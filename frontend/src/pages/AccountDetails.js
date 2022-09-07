import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function AccountDetails({ getToken, getRefreshToken, updateAccessToken }) {
  const navigate = useNavigate();

  const [originalFirstName, setOriginalFirstName] = useState('');
  const [originalLastName, setOriginalLastName] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [originalPassword, setOriginalPassword] = useState('********');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('********');

  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPasword, setEditPassword] = useState(false);

  useEffect(() => {
    getAccountDetails();
  }, []);

  const getAccountDetails = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        token: getToken(),
        refreshToken: getRefreshToken(),
      },
    };

    const response = await fetch('/account/details', requestOptions);

    if (response.status === 400) {
      const data = await response.json();
      alert(data.message);
    } else if (response.status === 404) {
      alert('/account/details Fetch Failed');
    } else if (response.status === 200) {
      const res = await response.json();
      updateAccessToken(res);
      const data = res.data;
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setOriginalFirstName(data.firstName);
      setOriginalLastName(data.lastName);
      setOriginalEmail(data.email);
    } else {
      const res = await response.json();
      alert(res.data);
    }
  };

  const saveDetails = async () => {
    if (!validationChecks()) {
      return;
    }

    let details = {};
    if (originalFirstName !== firstName) {
      details.firstName = firstName;
    }
    if (originalLastName !== lastName) {
      details.lastName = lastName;
    }
    if (originalEmail !== email) {
      details.email = email;
    }
    if (originalPassword !== password) {
      details.password = password;
    }

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        token: getToken(),
        refreshToken: getRefreshToken(),
      },
      body: JSON.stringify(details),
    };

    const response = await fetch('/account/details', requestOptions);

    if (response.status === 400) {
      const res = await response.json();
      alert(res.data);
    } else if (response.status === 404) {
      alert('/account/details Fetch Failed');
    } else if (response.status === 200) {
      const res = await response.json();
      updateAccessToken(res);
      navigate('/account');
    } else {
      const res = await response.json();
      alert(res.data);
    }
  };

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

  const handleEditFirstNameButton = () => {
    if (editFirstName) {
      setEditFirstName(false);
      saveDetails();
    } else {
      setEditFirstName(true);
    }
  };

  const handleEditLastNameButton = () => {
    if (editLastName) {
      setEditLastName(false);
      saveDetails();
    } else {
      setEditLastName(true);
    }
  };

  const handleEditEmailButton = () => {
    if (editEmail) {
      setEditEmail(false);
      saveDetails();
    } else {
      setEditEmail(true);
    }
  };

  const handleEditPasswordButton = () => {
    if (editPasword) {
      setEditPassword(false);
      saveDetails();
    } else {
      setEditPassword(true);
    }
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
      <Typography variant='h4'>Account</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '450px',
          margin: '20px 0',
        }}
      >
        <Box>
          <Typography variant='h6'>First Name:</Typography>
          {editFirstName ? (
            <TextField
              sx={{ width: '360px', margin: '6px 0' }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id='standard-basic'
              variant='standard'
              color='secondary'
            />
          ) : (
            <Typography variant='body1'>{firstName}</Typography>
          )}
        </Box>
        <Box>
          <Button
            color={editFirstName ? 'success' : 'info'}
            sx={{ margin: '6px 0', textTransform: 'none' }}
            onClick={handleEditFirstNameButton}
          >
            {editFirstName ? (
              <Typography variant='body1'>Save</Typography>
            ) : (
              <Typography variant='body1'>Edit</Typography>
            )}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '450px',
          margin: '20px 0',
        }}
      >
        <Box>
          <Typography variant='h6'>Last Name:</Typography>
          {editLastName ? (
            <TextField
              sx={{ width: '360px', margin: '6px 0' }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id='standard-basic'
              variant='standard'
              color='secondary'
            />
          ) : (
            <Typography variant='body1'>{lastName}</Typography>
          )}
        </Box>
        <Box>
          <Button
            color={editLastName ? 'success' : 'info'}
            sx={{ margin: '6px 0', textTransform: 'none' }}
            onClick={handleEditLastNameButton}
          >
            {editLastName ? (
              <Typography variant='body1'>Save</Typography>
            ) : (
              <Typography variant='body1'>Edit</Typography>
            )}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '450px',
          margin: '20px 0',
        }}
      >
        <Box>
          <Typography variant='h6'>Email:</Typography>
          {editEmail ? (
            <TextField
              sx={{ width: '360px', margin: '6px 0' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='standard-basic'
              variant='standard'
              color='secondary'
            />
          ) : (
            <Typography variant='body1'>{email}</Typography>
          )}
        </Box>
        <Box>
          <Button
            color={editEmail ? 'success' : 'info'}
            sx={{ margin: '6px 0', textTransform: 'none' }}
            onClick={handleEditEmailButton}
          >
            {editEmail ? (
              <Typography variant='body1'>Save</Typography>
            ) : (
              <Typography variant='body1'>Edit</Typography>
            )}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '450px',
          margin: '20px 0',
        }}
      >
        <Box>
          <Typography variant='h6'>Password:</Typography>
          {editPasword ? (
            <TextField
              sx={{ width: '360px', margin: '6px 0' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id='standard-basic'
              variant='standard'
              color='secondary'
            />
          ) : (
            <Typography variant='body1'>{password}</Typography>
          )}
        </Box>
        <Box>
          <Button
            color={editPasword ? 'success' : 'info'}
            sx={{ margin: '6px 0', textTransform: 'none' }}
            onClick={handleEditPasswordButton}
          >
            {editPasword ? (
              <Typography variant='body1'>Save</Typography>
            ) : (
              <Typography variant='body1'>Edit</Typography>
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

AccountDetails.propTypes = {
  getToken: PropTypes.func,
  getRefreshToken: PropTypes.func,
  updateAccessToken: PropTypes.func,
};

export default AccountDetails;
