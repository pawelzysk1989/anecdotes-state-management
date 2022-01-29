import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Anecdote } from '../types/anecdote';
import useNotification from './use_notification';
import useResourceQueryFactory from './use_resource_query_factory';

const useAnecdoteResource = useResourceQueryFactory<
  Anecdote,
  Anecdote,
  Omit<Anecdote, 'id'>
>({
  path: 'anecdotes',
  getId: (anecdote) => anecdote.id,
});

const useAnecdotes = () => {
  const anecdotes = useAnecdoteResource.getAll();
  return anecdotes ?? [];
};

const useAnecdote = (id: string) => {
  const anecdote = useAnecdoteResource.get(id);
  return anecdote;
};

const useCreate = () => {
  const notification = useNotification();
  const navigate = useNavigate();
  const create = useAnecdoteResource.create({
    onSuccess: (anecdote) => {
      notification.show(`${anecdote.content} created`);
      navigate('/anecdotes');
    },
  });

  const createAnecdote = useCallback((content: string) => {
    create({
      content,
      votes: 0,
    });
  }, []);

  return createAnecdote;
};

const useVote = () => {
  const notification = useNotification();
  const update = useAnecdoteResource.update({
    onSuccess: (anecdote) => {
      notification.show(`${anecdote.content} voted`);
    },
  });

  const vote = useCallback((anecdote: Anecdote) => {
    update({
      ...anecdote,
      votes: anecdote.votes + 1,
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
