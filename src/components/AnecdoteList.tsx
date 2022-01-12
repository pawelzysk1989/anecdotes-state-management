import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import React, { useMemo } from 'react';

import anecdotesAtom from '../atoms/anecdotes';
import filterAtom from '../atoms/filter';

const AnecdoteList = () => {
  const anecdotes = useAtomValue(anecdotesAtom.value);
  const dispatch = useUpdateAtom(anecdotesAtom.dispatch);
  const filterValue = useAtomValue(filterAtom.value);

  const vote = (id: string) => {
    dispatch({ type: 'vote', id });
  };

  const sortedAnecdotes = useMemo(
    () => [...anecdotes].sort((a, b) => b.votes - a.votes),
    [anecdotes],
  );
  const filteredAnecdotes = useMemo(
    () => sortedAnecdotes.filter((anecdote) => anecdote.content.includes(filterValue)),
    [filterValue],
  );
  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
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
