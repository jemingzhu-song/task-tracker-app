import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Button, Card, Checkbox } from '@mui/material';
import ToDoCard from '../components/ToDoCard';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { updateListToDoCards, removeCardFromListToDoCards } from '../helper/TaskFunctions';
import { TaskStatus, TaskDescription } from '../enums/TaskEnums';

function HomeLoggedIn({ getToken, getRefreshToken, updateAccessToken }) {
  /* Status Codes:
      'Incomplete'
      'Complete'
      'InProgress' - (Future Implementation)
  */
  const [listToDoCards, setListToDoCards] = useState([]);

  useEffect(() => {
    setListToDoCards([]);
    getToDoCards();
  }, []);

  const createNewCard = async () => {
    const toDoCardDetails = {
      description: TaskDescription.DEFAULT,
      status: TaskStatus.INCOMPLETE,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        token: getToken(),
        refreshToken: getRefreshToken(),
      },
      body: JSON.stringify(toDoCardDetails),
    };

    const response = await fetch('/task', requestOptions);

    if (response.status === 500) {
      alert('Incorrect password or email');
    } else if (response.status === 400) {
      alert(response.status + ' Bad Request');
    } else if (response.status === 404) {
      alert('/login Fetch Failed');
    } else if (response.status === 200) {
      const res = await response.json();
      updateAccessToken(res);
      const data = res.data;
      const newTaskId = data._id;
      setListToDoCards((listToDoCards) => {
        return [
          ...listToDoCards,
          {
            id: uuid(),
            taskId: newTaskId,
            description: TaskDescription.DEFAULT,
            status: TaskStatus.INCOMPLETE,
          },
        ];
      });
    }
  };

  const getToDoCards = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        token: getToken(),
        refreshToken: getRefreshToken(),
      },
    };

    const response = await fetch('/task/all', requestOptions);

    if (response.status === 500) {
      alert('Incorrect password or email');
    } else if (response.status === 400) {
      alert(response.status + ' Bad Request');
    } else if (response.status === 404) {
      alert('/login Fetch Failed');
    } else if (response.status === 200) {
      const res = await response.json();
      updateAccessToken(res);
      const data = res.data;
      let cardList = [];
      for (let t of data) {
        cardList.push({ id: uuid(), taskId: t._id, description: t.description, status: t.status });
      }
      setListToDoCards(cardList);
    }
  };

  const updateList = (cardId, newDescription, newStatus) => {
    updateListToDoCards(listToDoCards, setListToDoCards, cardId, newDescription, newStatus);
  };

  const removeFromList = (cardId) => {
    removeCardFromListToDoCards(listToDoCards, setListToDoCards, cardId);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '80px 0',
      }}
    >
      {[...new Set(listToDoCards)].map((item) => (
        <ToDoCard
          key={item.id}
          loggedIn={true}
          getToken={getToken}
          getRefreshToken={getRefreshToken}
          updateList={updateList}
          removeFromList={removeFromList}
          idInput={item.id}
          taskIdInput={item.taskId}
          descriptionInput={item.description}
          checkedInput={item.status}
          updateAccessToken={updateAccessToken}
        ></ToDoCard>
      ))}
      <Button
        color='inherit'
        sx={{ margin: '6px 0', textTransform: 'none' }}
        onClick={(e) => {
          createNewCard();
        }}
      >
        <Typography variant='body1'>Add</Typography>
      </Button>
    </Box>
  );
}

HomeLoggedIn.propTypes = {
  getToken: PropTypes.func,
  getRefreshToken: PropTypes.func,
  updateAccessToken: PropTypes.func,
};

export default HomeLoggedIn;
