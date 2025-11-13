import { useState, useEffect } from 'react';
import { socket } from '../socket/socket';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  const connect = (username) => {
    socket.connect();
    if (username) socket.emit('user_join', username);
  };

  const disconnect = () => socket.disconnect();

  const sendMessage = (message) => socket.emit('send_message', { message });

  const sendPrivateMessage = (to, message) => socket.emit('private_message', { to, message });

  const setTyping = (isTyping) => socket.emit('typing', isTyping);

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('receive_message', (msg) => setMessages(prev => [...prev, msg]));
    socket.on('private_message', (msg) => setMessages(prev => [...prev, msg]));

    socket.on('user_list', (list) => setUsers(list));
    socket.on('user_joined', (user) => {
      setMessages(prev => [...prev, { system: true, message: `${user.username} joined` }]);
    });
    socket.on('user_left', (user) => {
      setMessages(prev => [...prev, { system: true, message: `${user.username} left` }]);
    });
    socket.on('typing_users', (list) => setTypingUsers(list));

    return () => {
      socket.off();
    };
  }, []);

  return { socket, isConnected, messages, users, typingUsers, connect, disconnect, sendMessage, sendPrivateMessage, setTyping };
};
