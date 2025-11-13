import React from 'react';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import UserList from '../components/UserList';

const ChatRoom = ({ messages, users, typingUsers, sendMessage, setTyping }) => (
  <div className="chat-room">
    <UserList users={users} typingUsers={typingUsers} />
    <MessageList messages={messages} />
    <ChatInput sendMessage={sendMessage} setTyping={setTyping} />
  </div>
);

export default ChatRoom;
