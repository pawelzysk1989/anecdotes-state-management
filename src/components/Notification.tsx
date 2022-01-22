import React from 'react';

import useNotification from '../hooks/use_notification';

const Notification = () => {
  const { value: notification } = useNotification();
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return notification ? <div style={style}>{notification}</div> : null;
};

export default Notification;
