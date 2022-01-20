import React, { useState } from 'react';

import useAnecdoteQueries from '../hooks/use_anecdote_queries';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const anecdoteQueries = useAnecdoteQueries();

  const updateContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const createAnecdote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    anecdoteQueries.create.mutate({
      content,
      votes: 0,
    });
  };

  return (
    <form onSubmit={createAnecdote}>
      <label>
        <input name="content" value={content} onChange={updateContent} />
      </label>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
