import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/anecdotes">anecdotes</Link> |{' '}
      <Link to="/anecdotes/create">create new</Link>
    </nav>
  );
};

export default Navbar;
