import { useUpdateAtom } from 'jotai/utils';
import React, { useState } from 'react';

import anecdoteAtoms from '../atoms/anecdotes';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useUpdateAtom(anecdoteAtoms.dispatch);

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
