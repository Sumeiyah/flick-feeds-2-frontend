// Notification.js
import React from 'react';
import theme from './theme';

const Notification = ({ message }) => {
  return (
    <div style={theme.notification}>
      {message}
    </div>
  );
};

export default Notification;
