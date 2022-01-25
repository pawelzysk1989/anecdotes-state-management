import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Anecdote } from '../types/anecdote';
import useAnecdoteQuery from './use_anecdote_query';
import useNotification from './use_notification';

const useAnecdotes = () => {
  const getAllQuery = useAnecdoteQuery.getAll();
  return getAllQuery.data ?? [];
};

const useAnecdote = (id: string) => {
  const getQuery = useAnecdoteQuery.get(id);
  return getQuery.data;
};

const useCreate = () => {
  const createQuery = useAnecdoteQuery.create();
  const notification = useNotification();
  const navigate = useNavigate();

  const create = useCallback((content: string) => {
    createQuery.mutate(
      {
        content,
        votes: 0,
      },
      {
        onSuccess: () => {
          notification.show(`${content} created`);
          navigate('/anecdotes');
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
  get: useAnecdote,
  create: useCreate,
  vote: useVote,
};
