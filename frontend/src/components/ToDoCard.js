import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Button, Card, Checkbox, TextField } from '@mui/material';
import { TaskStatus } from '../enums/TaskEnums';

function ToDoCard({
  loggedIn,
  getToken,
  getRefreshToken,
  updateList,
  removeFromList,
  idInput,
  taskIdInput,
  descriptionInput,
  checkedInput,
  updateAccessToken,
}) {
  const [id, setId] = useState(idInput);
  const [taskId, setTaskId] = useState(taskIdInput);
  const [checked, setChecked] = useState(checkedInput === TaskStatus.INCOMPLETE ? false : true);
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState(descriptionInput);

  const saveToDoCard = async (statusCode) => {
    const toDoCardDetails = {
      taskId: taskId,
      description: description,
      status: statusCode,
    };

    const requestOptions = {
      method: 'PUT',
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
      console.log(res.data);
    }
  };

  const removeToDoCard = async () => {
    const toDoCardDetails = {
      taskId: taskId,
    };

    const requestOptions = {
      method: 'DELETE',
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
      console.log(res.data);
    }
  };

  const handleCheckbox = () => {
    // Since "setChecked()" and "saveToDoCard()" are both async functions.
    let currentChecked = checked;
    setChecked(!currentChecked);
    let status = !currentChecked ? TaskStatus.COMPLETE : TaskStatus.INCOMPLETE;
    updateList(id, description, status);
    if (loggedIn) {
      saveToDoCard(status);
    }
  };

  const handleTextField = (textFieldValue) => {
    setDescription(textFieldValue);
    let status = checked ? TaskStatus.COMPLETE : TaskStatus.INCOMPLETE;
    updateList(id, description, status);
  };

  const handleTextFieldBlur = () => {
    setEdit(false);
    if (loggedIn) {
      let status = checked ? TaskStatus.COMPLETE : TaskStatus.INCOMPLETE;
      saveToDoCard(status);
    }
  };

  const handleButton = () => {
    removeFromList(id);
    if (loggedIn) {
      removeToDoCard();
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '10px 0',
        minWidth: 400,
        padding: '10px 10px',
      }}
    >
      <Checkbox color='success' checked={checked} onChange={handleCheckbox}></Checkbox>
      {edit ? (
        <TextField
          sx={{ width: '360px', margin: '6px 0' }}
          value={description}
          onChange={(e) => {
            handleTextField(e.target.value);
          }}
          onBlur={handleTextFieldBlur}
          id='standard-basic'
          variant='standard'
          color='secondary'
        />
      ) : (
        <Typography
          sx={checked ? { textDecoration: 'line-through', width: '360px' } : { width: '360px' }}
          variant='body1'
          onClick={() => setEdit(true)}
        >
          {description}
        </Typography>
      )}
      <Button color='error' onClick={handleButton}>
        Delete
      </Button>
    </Card>
  );
}

ToDoCard.propTypes = {
  loggedIn: PropTypes.bool,
  getToken: PropTypes.func,
  getRefreshToken: PropTypes.func,
  updateList: PropTypes.func,
  removeFromList: PropTypes.func,
  id: PropTypes.string,
  taskIdInput: PropTypes.string,
  descriptionInput: PropTypes.string,
  checkedInput: PropTypes.string,
  updateAccessToken: PropTypes.func,
};

export default ToDoCard;
