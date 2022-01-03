import { useAtom } from 'jotai';
import React, { useState } from 'react';

import anecdotesAtom from '../atoms/anecdotes';

const AnecdoteForm = () => {
  const [, dispatch] = useAtom(anecdotesAtom);
  const [content, setContent] = useState('');
  const updateContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const createAnecdote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'create', content });
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
