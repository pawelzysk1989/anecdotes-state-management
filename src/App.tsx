import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Notification from './components/Notification';

const App = () => {
  return (
    <>
      <Navbar />
      <Notification />
      <Outlet />
    </>
  );
};

export default App;
