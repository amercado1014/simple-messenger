import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    width: '100%',
    marginTop: 10
  },
  submitBtn: {
    margin: '24px 0px 16px'
  }
}));

const LoginPage = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <Typography color="primary" component="h1" variant="h5">
        SIMPLE MESSENGER
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          onChange={e => setName(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="name"
          value={name}
          label="User Name"
          autoFocus
        />
        <TextField
          onChange={e => setRoom(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="room"
          value={room}
          label="Room Name"
        />
        <Button
          className={classes.submitBtn}
          href={`/chat?name=${name.trim()}&room=${room.trim()}`}
          disabled={!name || !room}
          fullWidth
          variant="contained"
          color="primary"
        >
          Join Room
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
