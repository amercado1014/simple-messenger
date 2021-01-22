import React from 'react';
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

const Messenger = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} component="main" maxWidth="lg">
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Room Name:
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
            <ListItem key="1">
              <ListItemText primary="Adin"></ListItemText>
            </ListItem>
            <ListItem key="2">
              <ListItemText primary="Adilyn"></ListItemText>
            </ListItem>
            <ListItem key="3">
              <ListItemText primary="Hannah"></ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageList}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText secondary="756pm - Adin"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText secondary="756pm - Adin"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText secondary="756pm - Adin"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container component="form" spacing={1} className={classes.inputContainer}>
            <Grid item xs={10}>
              <TextField label="Enter Message" autoFocus name="message" fullWidth />
            </Grid>
            <Grid item xs={2} align="right">
              <Fab type="submit" className={classes.submitBtn} color="primary">
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
