import React from 'react';
import { useParams } from 'react-router-dom';

import useAnecdotes from '../hooks/use_anecdotes';
import { Anecdote } from '../types/anecdote';

const AnecdoteDetails = () => {
  const params = useParams();
  const id = params['id'] ?? '';
  const anecdote = useAnecdotes.get(id);
  const voteForAnecdote = useAnecdotes.vote();

  const vote = (anecdote: Anecdote) => {
    voteForAnecdote(anecdote);
  };

  if (!anecdote) {
    return null;
  }

  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </>
  );
};

export default AnecdoteDetails;
