import { useAtomValue } from 'jotai/utils';
import React, { useMemo } from 'react';

import filter from '../atoms/filter';
import useAnecdotes from '../hooks/use_anecdotes';
import { Anecdote } from '../types/anecdote';

const AnecdoteList = () => {
  const filterValue = useAtomValue(filter.value);
  const anecdotes = useAnecdotes();

  const filteredAnecdotes = useMemo(
    () =>
      [...anecdotes.value]
        .filter((anecdote) => anecdote.content.includes(filterValue))
        .sort((a, b) => b.votes - a.votes),
    [filterValue, anecdotes.value],
  );

  const vote = (anecdote: Anecdote) => {
    anecdotes.vote(anecdote);
  };

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
