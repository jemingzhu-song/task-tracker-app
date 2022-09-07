import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Button, Card, Checkbox } from '@mui/material';
import ToDoCard from '../components/ToDoCard';
import uuid from 'react-uuid';

function HomeLoggedOut() {
  /* Status Codes:
      'Incomplete'
      'Complete'
      'InProgress' - (Future Implementation)
  */
  const [listToDoCards, setListToDoCards] = useState([]);
  const addCard = () => {
    setListToDoCards((listToDoCards) => {
      return [...listToDoCards, { id: uuid(), description: 'To Do', status: 'Incomplete' }];
    });
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
      {listToDoCards.map((item) => (
        <ToDoCard
          key={item.id}
          loggedIn={false}
          updateList={updateListToDoCards}
          removeFromList={removeCardFromListToDoCards}
          idInput={item.id}
          descriptionInput={item.description}
          checkedInput={item.status}
        ></ToDoCard>
      ))}
      <Button color='inherit' sx={{ margin: '6px 0', textTransform: 'none' }} onClick={addCard}>
        <Typography variant='body1'>Add</Typography>
      </Button>
    </Box>
  );
}

export default HomeLoggedOut;
