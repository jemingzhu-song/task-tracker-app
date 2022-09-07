import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomeLoggedOut from './pages/HomeLoggedOut';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Cookies from 'js-cookie';
import AccountDetails from './pages/AccountDetails';
import TaskPage from './pages/TaskPage';

// https://mui.com/material-ui/customization/default-theme/
const theme = createTheme({
  palette: {
    primary: {
      main: '#F7F6F3',
    },
    secondary: {
      main: '#000000',
    },
    success: {
      main: '#67DC98',
      light: '#ACECC7',
      dark: '#2BBB67',
    },
    error: {
      main: '#F0776A',
      light: '#F7BAB3',
      dark: '#E93B28',
    },
    info: {
      main: '#79BCE9',
      light: '#C2E0F5',
      dark: '#228BD1',
    },
  },
  typography: {
    fontFamily: 'Nunito',
    fontSize: 14,
    h1: {
      fontFamily: 'Nunito',
      fontWeight: 700,
      fontSize: '70px',
      letterSpacing: '1px',
    },
    h2: {
      fontFamily: 'Nunito',
      fontWeight: 600,
      fontSize: '60px',
      letterSpacing: '0.5px',
    },
    h3: {
      fontFamily: 'Nunito',
      fontWeight: 500,
      fontSize: '50px',
    },
    h4: {
      fontFamily: 'Nunito',
      fontWeight: 500,
      fontSize: '30px',
    },
    h5: {
      fontFamily: 'Nunito',
      fontWeight: 700,
      fontSize: '24px',
    },
    h6: {
      fontFamily: 'Nunito',
      fontWeight: 700,
      fontSize: '18px',
    },
    subtitle1: {
      fontFamily: 'Nunito',
      fontWeight: 600,
      fontSize: '40px',
      fontStyle: 'italic',
    },
    subtitle2: {
      fontFamily: 'Nunito',
      fontWeight: 600,
      fontSize: '20px',
      fontStyle: 'italic',
    },
    body1: {
      fontFamily: 'Nunito',
      fontWeight: 500,
      fontSize: '18px',
    },
    body2: {
      fontFamily: 'Nunito',
      fontWeight: 500,
      fontSize: '14px',
    },
  },
});

function App() {
  const getToken = () => {
    return Cookies.get('token');
  };

  const setToken = (token) => {
    Cookies.set('token', token);
  };

  const clearToken = () => {
    Cookies.remove('token');
  };

  const getRefreshToken = () => {
    return Cookies.get('refresh-token');
  };

  const setRefreshToken = (token) => {
    Cookies.set('refresh-token', token);
  };

  const clearRefreshToken = () => {
    Cookies.remove('refresh-token');
  };

  const tokenExists = () => {
    if (Cookies.get('token') === '' || Cookies.get('token') === undefined || Cookies.get('token') === null) {
      return false;
    } else {
      return true;
    }
  };

  const updateAccessToken = (res) => {
    if (res.newAccessToken) {
      Cookies.set('token', res.newAccessToken);
    }
    return;
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <NavigationBar
          getToken={getToken}
          getRefreshToken={getRefreshToken}
          tokenExists={tokenExists}
          clearToken={clearToken}
          clearRefreshToken={clearRefreshToken}
        />
        <Routes>
          <Route
            path='/'
            element={
              <TaskPage
                getToken={getToken}
                getRefreshToken={getRefreshToken}
                tokenExists={tokenExists}
                updateAccessToken={updateAccessToken}
              />
            }
          />
          <Route
            path='/login'
            element={<LoginPage setToken={setToken} setRefreshToken={setRefreshToken} />}
          />
          <Route path='/register' element={<RegisterPage setToken={setToken} />} />
          <Route
            path='/account'
            element={
              <AccountDetails
                getToken={getToken}
                getRefreshToken={getRefreshToken}
                updateAccessToken={updateAccessToken}
              />
            }
          />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
