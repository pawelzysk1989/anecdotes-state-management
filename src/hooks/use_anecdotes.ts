import { useAtomValue } from 'jotai/utils';
import { useMemo } from 'react';

import filter from '../atoms/filter';
import useAnecdoteQueries from './use_anecdote_queries';

const useAnecdotes = () => {
  const filterValue = useAtomValue(filter.value);
  const anecdoteQueries = useAnecdoteQueries();

  const anecdotes = anecdoteQueries.getAll.data ?? [];

  const sortedAnecdotes = useMemo(
    () => [...anecdotes].sort((a, b) => b.votes - a.votes),
    [anecdotes],
  );
  const filteredAnecdotes = useMemo(
    () =>
      [...sortedAnecdotes].filter((anecdote) => anecdote.content.includes(filterValue)),
    [filterValue, sortedAnecdotes],
  );

  return filteredAnecdotes;
};

export default useAnecdotes;
