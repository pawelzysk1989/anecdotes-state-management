import { useAtomValue } from 'jotai/utils';
import React from 'react';

import notificationAtoms from '../atoms/notification';

const Notification = () => {
  const notification = useAtomValue(notificationAtoms.value);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return notification ? <div style={style}>{notification}</div> : null;
};

export default Notification;
