import React from 'react';

const MessageList = ({ messages }) => (
  <div className="messages">
    {messages.map((msg, idx) => (
      <div key={idx} className={msg.system ? 'system-message' : 'user-message'}>
        {msg.system ? <em>{msg.message}</em> : <strong>{msg.sender}: </strong>}{msg.message}
      </div>
    ))}
  </div>
);

export default MessageList;
