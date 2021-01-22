import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
  container: {
    minWidth: 470
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    boxShadow: 'none',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  title: {
    flexGrow: 1
  },
  chatSection: {
    width: '100%',
    height: '85vh'
  },
  userSection: {
    borderRight: '1px solid #e0e0e0'
  },
  messageList: {
    height: '70vh',
    overflowY: 'auto'
  },
  inputContainer: {
    padding: 20
  },
  submitBtn: {
    display: 'flex',
    justifyContent: 'center'
  }
});

let socket;

const Messenger = ({ location }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  const url = 'localhost:5000';

  useEffect(() => {
    const name = queryString.parse(location.search).name;
    const room = queryString.parse(location.search).room;

    setName(name);
    setRoom(room);

    socket = io(url);
    socket.emit('joinRoom', { name, room });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [url, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });

    socket.on('roomUsers', ({ users }) => {
      setUsers(users);
    });
  }, [messages, users]);

  const onendChatMessage = e => {
    e.preventDefault();

    if (message) {
      socket.emit('chatMessage', message);
      setMessage('');
    }
  };

  return (
    <Container className={classes.container} component="main" maxWidth="lg">
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Room Name: {room}
          </Typography>
          <IconButton href="/" color="inherit">
            <CancelIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid
        container
        component={Paper}
        elevation={0}
        variant="outlined"
        className={classes.chatSection}
      >
        <Grid item xs={3} className={classes.userSection}>
          <List>
            <ListItem>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Users:
              </Typography>
            </ListItem>
            {users.map((user, index) => (
              <ListItem key={index}>
                <ListItemText primary={user.name}></ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageList}>
            {messages.map((message, index) => (
              <ListItem key={index}>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      align={name === message.name ? 'right' : ''}
                      primary={message.text}
                    ></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText
                      align={name === message.name ? 'right' : ''}
                      secondary={`${message.time} - ${message.name}`}
                    ></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Grid
            container
            onSubmit={e => onendChatMessage(e)}
            component="form"
            spacing={1}
            className={classes.inputContainer}
          >
            <Grid item xs={10}>
              <TextField
                onChange={e => setMessage(e.target.value)}
                value={message}
                label="Enter Message"
                autoFocus
                name="message"
                fullWidth
              />
            </Grid>
            <Grid item xs={2} align="right">
              <Fab type="submit" className={classes.submitBtn} disabled={!message} color="primary">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Messenger;
