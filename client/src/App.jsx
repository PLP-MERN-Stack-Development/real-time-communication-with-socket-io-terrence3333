import React, { useState, useContext } from 'react';
import { SocketProvider, SocketContext } from './context/SocketContext';
import Login from './pages/Login';
import ChatRoom from './pages/ChatRoom';

function AppContent() {
  const { connect, ...socketData } = useContext(SocketContext);
  const [username, setUsername] = useState('');

  if (!username) {
    return <Login onLogin={(name) => { setUsername(name); connect(name); }} />;
  }

  return <ChatRoom {...socketData} />;
}

function App() {
  return (
    <SocketProvider>
      <AppContent />
    </SocketProvider>
  );
}

export default App;
