import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavigationBar({ getToken, getRefreshToken, tokenExists, clearToken, clearRefreshToken }) {
  const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: '#000000',
  });
  const navigate = useNavigate();

  const handleLogout = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        token: getToken(),
        refreshToken: getRefreshToken(),
      },
    };

    const response = await fetch('/auth/token', requestOptions);

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
    } else {
      const data = await response.json();
      alert(data);
    }

    clearToken();
    clearRefreshToken();

    navigate('/');
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='primary' mode='dark' sx={{ color: '#000000', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant='h5' sx={{ flexGrow: 1 }}>
            <StyledLink to='/'>🚀 Traction</StyledLink>
          </Typography>
          {tokenExists() == true ? (
            <Box>
              <StyledLink to='/account'>
                <Button color='inherit' sx={{ textTransform: 'none' }}>
                  <Typography variant='body1'>Account</Typography>
                </Button>
              </StyledLink>
              <StyledLink to='/'>
                <Button color='inherit' sx={{ textTransform: 'none' }} onClick={handleLogout}>
                  <Typography variant='body1'>Logout</Typography>
                </Button>
              </StyledLink>
            </Box>
          ) : (
            <Box>
              <StyledLink to='/login'>
                <Button color='inherit' sx={{ textTransform: 'none' }}>
                  <Typography variant='body1'>Login</Typography>
                </Button>
              </StyledLink>
              <StyledLink to='/register'>
                <Button color='inherit' sx={{ textTransform: 'none' }}>
                  <Typography variant='body1'>Register</Typography>
                </Button>
              </StyledLink>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

NavigationBar.propTypes = {
  getToken: PropTypes.func,
  getRefreshToken: PropTypes.func,
  tokenExists: PropTypes.func,
  clearToken: PropTypes.func,
  clearRefreshToken: PropTypes.func,
};

export default NavigationBar;
