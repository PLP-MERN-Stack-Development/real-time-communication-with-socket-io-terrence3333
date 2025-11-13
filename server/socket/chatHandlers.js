const messages = require('../models/messageModel');
const { formatMessage } = require('../utils/helpers');

const users = {};
const typingUsers = {};

module.exports = (io, socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('user_join', (username) => {
    users[socket.id] = { username, id: socket.id };
    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id });
    console.log(`${username} joined the chat`);
  });

  socket.on('send_message', ({ message }) => {
    const msg = formatMessage({ sender: users[socket.id]?.username || 'Anonymous', message });
    messages.push(msg);
    if (messages.length > 100) messages.shift();
    io.emit('receive_message', msg);
  });

  socket.on('private_message', ({ to, message }) => {
    const msg = formatMessage({ sender: users[socket.id]?.username || 'Anonymous', message, isPrivate: true });
    socket.to(to).emit('private_message', msg);
    socket.emit('private_message', msg);
  });

  socket.on('typing', (isTyping) => {
    if (!users[socket.id]) return;
    const username = users[socket.id].username;
    if (isTyping) typingUsers[socket.id] = username;
    else delete typingUsers[socket.id];
    io.emit('typing_users', Object.values(typingUsers));
  });

  socket.on('disconnect', () => {
    if (users[socket.id]) {
      const { username } = users[socket.id];
      io.emit('user_left', { username, id: socket.id });
      console.log(`${username} left the chat`);
      delete users[socket.id];
      delete typingUsers[socket.id];
      io.emit('user_list', Object.values(users));
      io.emit('typing_users', Object.values(typingUsers));
    }
  });
};
