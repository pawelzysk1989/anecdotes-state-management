import React from 'react';

import useAnecdotes from '../hooks/use_anecdotes';
import useUrlParams from '../hooks/use_url_params';
import { Anecdote } from '../types/anecdote';

const AnecdoteDetails = () => {
  const { anecdoteId } = useUrlParams('anecdote');
  const anecdote = useAnecdotes.get(anecdoteId);
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
