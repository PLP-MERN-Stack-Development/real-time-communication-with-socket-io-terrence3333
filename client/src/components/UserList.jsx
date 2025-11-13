import React from 'react';

const UserList = ({ users, typingUsers }) => (
  <div className="users">
    <h4>Online Users</h4>
    <ul>
      {users.map(u => (
        <li key={u.id}>
          {u.username} {typingUsers.includes(u.username) && <em>(typing...)</em>}
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;
