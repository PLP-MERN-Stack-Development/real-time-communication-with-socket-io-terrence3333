import React, { useState } from 'react';

const ChatInput = ({ sendMessage, setTyping }) => {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
      setTyping(false);
    }
  };

  return (
    <form onSubmit={handleSend}>
      <input
        type="text"
        value={message}
        placeholder="Type a message..."
        onChange={(e) => {
          setMessage(e.target.value);
          setTyping(e.target.value.length > 0);
        }}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
