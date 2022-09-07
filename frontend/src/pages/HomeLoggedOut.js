import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Button, Card, Checkbox } from '@mui/material';
import ToDoCard from '../components/ToDoCard';
import uuid from 'react-uuid';
import { updateListToDoCards, removeCardFromListToDoCards } from '../helper/TaskFunctions';
import { TaskStatus, TaskDescription } from '../enums/TaskEnums';

function HomeLoggedOut() {
  /* Status Codes:
      'Incomplete'
      'Complete'
      'InProgress' - (Future Implementation)
  */
  const [listToDoCards, setListToDoCards] = useState([]);
  const createNewCard = () => {
    setListToDoCards((listToDoCards) => {
      const newCard = {
        id: uuid(),
        description: TaskDescription.DEFAULT,
        status: TaskStatus.INCOMPLETE,
      };
      return [...listToDoCards, newCard];
    });
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
      {listToDoCards.map((item) => (
        <ToDoCard
          key={item.id}
          loggedIn={false}
          updateList={updateList}
          removeFromList={removeFromList}
          idInput={item.id}
          descriptionInput={item.description}
          checkedInput={item.status}
        ></ToDoCard>
      ))}
      <Button color='inherit' sx={{ margin: '6px 0', textTransform: 'none' }} onClick={createNewCard}>
        <Typography variant='body1'>Add</Typography>
      </Button>
    </Box>
  );
}

export default HomeLoggedOut;
