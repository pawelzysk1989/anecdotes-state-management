import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import React, { useMemo } from 'react';

import anecdoteAtoms from '../atoms/anecdotes';

const AnecdoteList = () => {
  const anecdotes = useAtomValue(anecdoteAtoms.value);
  const dispatch = useUpdateAtom(anecdoteAtoms.dispatch);

  const vote = (id: string) => {
    dispatch({ type: 'vote', id });
  };

  const sortedAnecdotes = useMemo(
    () => [...anecdotes].sort((a, b) => b.votes - a.votes),
    [anecdotes],
  );
  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
