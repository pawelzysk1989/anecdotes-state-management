import React from 'react';

import useAnecdoteQueries from '../hooks/use_anecdote_queries';
import useAnecdotes from '../hooks/use_anecdotes';
import { Anecdote } from '../types/anecdote';

const AnecdoteList = () => {
  const anecdoteQueries = useAnecdoteQueries();

  const anecdotes = useAnecdotes();

  const vote = (anecdote: Anecdote) => {
    anecdoteQueries.vote.mutate(anecdote);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              disabled={anecdoteQueries.vote.variables === anecdote}
              onClick={() => vote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
