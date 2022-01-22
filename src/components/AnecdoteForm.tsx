import React, { useState } from 'react';

import useAnecdotes from '../hooks/use_anecdotes';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const anecdotes = useAnecdotes();

  const updateContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const createAnecdote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    anecdotes.create(content);
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
