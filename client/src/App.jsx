import { useState } from 'react';
import { Login } from './pages/Login';
import { ChatRoom } from './pages/ChatRoom';
import { useSocket } from './hooks/useSocket';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const { connect } = useSocket();

  const handleLogin = (name) => {
    setUsername(name);
    connect(name);
    setLoggedIn(true);
  };

  return (
    <div>
      {loggedIn ? <ChatRoom username={username} /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
