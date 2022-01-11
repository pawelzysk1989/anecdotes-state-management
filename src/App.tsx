import React from 'react';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Section from './components/Section';

const App = () => {
  return (
    <>
      <Notification />
      <Section title="anecdotes">
        <AnecdoteList />
      </Section>

      <Section title="create new">
        <AnecdoteForm />
      </Section>
    </>
  );
};

export default App;
