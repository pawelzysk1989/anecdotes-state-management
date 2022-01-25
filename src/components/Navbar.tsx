import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <NavLink end to="/anecdotes">
        anecdotes
      </NavLink>{' '}
      | <NavLink to="/anecdotes/create">create new</NavLink>
    </nav>
  );
};

export default Navbar;
