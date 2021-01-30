const express = require('express');
const http = require('http');
const router = require('./router');
const { formatMessage } = require('./utils/format-message');
const { addUser, getUser, removeUser, getRoomUsers } = require('./utils/handle-users');

const app = express();
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

app.use(router);

const PORT = process.env.PORT || 5000;
const adminName = 'Simple Admin';

io.on('connection', socket => {
  socket.on('joinRoom', ({ name, room }) => {
    const user = {
      id: socket.id,
      name,
      room
    };

    addUser(user);

    socket.join(room);

    socket.emit('message', formatMessage(adminName, 'Welcome to Simple Messenger'));

    socket.broadcast
      .to(room)
      .emit('message', formatMessage(adminName, `${name} has joined the chat`));

    io.to(room).emit('roomUsers', {
      room,
      users: getRoomUsers(room)
    });
  });

  socket.on('chatMessage', message => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.name, message));
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', formatMessage(adminName, `${user.name} has left the chat`));
    }

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });
});

httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
