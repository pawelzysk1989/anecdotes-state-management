import React, { useState } from 'react';

import useAnecdotes from '../hooks/use_anecdotes';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const createAnecdote = useAnecdotes.create();

  const updateContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAnecdote(content);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input name="content" value={content} onChange={updateContent} />
      </label>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
