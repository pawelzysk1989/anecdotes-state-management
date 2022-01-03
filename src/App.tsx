import React from 'react';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Section from './components/Section';

const App = () => {
  return (
    <>
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
