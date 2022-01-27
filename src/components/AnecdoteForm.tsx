import React from 'react';

import useAnecdotes from '../hooks/use_anecdotes';
import useField from '../hooks/use_field';
import Section from './Section';

const AnecdoteForm = () => {
  const { reset: resetContent, input: contentInput } = useField({
    name: 'content',
  });
  const createAnecdote = useAnecdotes.create();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAnecdote(contentInput.value);
  };

  const resetForm = () => {
    resetContent();
  };

  return (
    <Section title="create new">
      <form onSubmit={handleSubmit}>
        <label>
          <input {...contentInput} />
        </label>
        <button type="submit">create</button>
        <button type="button" onClick={resetForm}>
          reset
        </button>
      </form>
    </Section>
  );
};

export default AnecdoteForm;
