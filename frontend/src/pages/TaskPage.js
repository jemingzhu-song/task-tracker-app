import React from 'react';
import PropTypes from 'prop-types';
import HomeLoggedIn from './HomeLoggedIn';
import HomeLoggedOut from './HomeLoggedOut';

function TaskPage({ getToken, getRefreshToken, tokenExists, updateAccessToken }) {
  if (tokenExists()) {
    return (
      <HomeLoggedIn
        getToken={getToken}
        getRefreshToken={getRefreshToken}
        updateAccessToken={updateAccessToken}
      />
    );
  } else {
    return <HomeLoggedOut />;
  }
}

TaskPage.propTypes = {
  getToken: PropTypes.func,
  getRefreshToken: PropTypes.func,
  tokenExists: PropTypes.func,
  updateAccessToken: PropTypes.func,
};

export default TaskPage;
