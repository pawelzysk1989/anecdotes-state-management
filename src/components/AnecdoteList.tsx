import { useAtom } from 'jotai';
import React, { useMemo } from 'react';

import anecdotesAtom from '../atoms/anecdotes';

const AnecdoteList = () => {
  const [anecdotes, dispatch] = useAtom(anecdotesAtom);

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
