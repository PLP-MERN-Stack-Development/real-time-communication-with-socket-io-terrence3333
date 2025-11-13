const { Server } = require('socket.io');
const chatHandlers = require('../controllers/chatHandlers');

const initSocket = (server, CLIENT_URL) => {
  const io = new Server(server, {
    cors: {
      origin: CLIENT_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => chatHandlers(io, socket));

  return io;
};

module.exports = initSocket;
