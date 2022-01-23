import { useCallback } from 'react';

import { Anecdote } from '../types/anecdote';
import useAnecdoteQuery from './use_anecdote_query';
import useNotification from './use_notification';

const useAnecdotes = () => {
  const getAll = useAnecdoteQuery.getAll();
  return getAll.data ?? [];
};

const useCreate = () => {
  const createQuery = useAnecdoteQuery.create();
  const notification = useNotification();

  const create = useCallback((content: string) => {
    createQuery.mutate(
      {
        content,
        votes: 0,
      },
      {
        onSuccess: () => {
          notification.show(`${content} created`);
        },
      },
    );
  }, []);

  return create;
};

const useVote = () => {
  const voteQuery = useAnecdoteQuery.vote();
  const notification = useNotification();

  const vote = useCallback((anecdote: Anecdote) => {
    voteQuery.mutate(anecdote, {
      onSuccess: () => {
        notification.show(`${anecdote.content} voted`);
      },
    });
  }, []);

  return vote;
};

export default {
  all: useAnecdotes,
  create: useCreate,
  vote: useVote,
};
