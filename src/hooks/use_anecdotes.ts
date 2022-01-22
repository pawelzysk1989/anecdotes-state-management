import { useCallback } from 'react';

import { Anecdote } from '../types/anecdote';
import useAnecdoteQueries from './use_anecdote_queries';
import useNotification from './use_notification';

const useAnecdotes = () => {
  const anecdoteQueries = useAnecdoteQueries();
  const notification = useNotification();

  const create = useCallback((content: string) => {
    anecdoteQueries.create
      .mutateAsync({
        content,
        votes: 0,
      })
      .then(() => notification.show(`${content} created`));
  }, []);

  const vote = useCallback((anecdote: Anecdote) => {
    anecdoteQueries.vote
      .mutateAsync(anecdote)
      .then(() => notification.show(`${anecdote.content} voted`));
  }, []);

  const anecdotes = anecdoteQueries.getAll.data ?? [];

  return {
    value: anecdotes,
    create,
    vote,
  };
};

export default useAnecdotes;
