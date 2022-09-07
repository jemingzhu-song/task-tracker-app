import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Button, Card, Checkbox } from '@mui/material';
import ToDoCard from '../components/ToDoCard';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function HomeLoggedIn({ getToken, getRefreshToken, updateAccessToken }) {
  const navigate = useNavigate();
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
    const description = 'To Do';
    const status = 'Incomplete';

    const toDoCardDetails = {
      description: description,
      status: status,
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
          { id: uuid(), taskId: newTaskId, description: description, status: status },
        ];
      });
    }
  };

  const updateListToDoCards = (cardId, newDescription, newStatus) => {
    let current = listToDoCards;
    current.map((card) => {
      if (card.id === cardId) {
        card.description = newDescription;
        card.status = newStatus;
      }
    });
    setListToDoCards(current);
  };

  const removeCardFromListToDoCards = (cardId) => {
    let current = listToDoCards;
    const result = current.filter((card) => card.id !== cardId);
    setListToDoCards(result);
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
          updateList={updateListToDoCards}
          removeFromList={removeCardFromListToDoCards}
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
