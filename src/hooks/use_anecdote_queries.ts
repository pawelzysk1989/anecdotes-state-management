import { useUpdateAtom } from 'jotai/utils';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import notification from '../atoms/notification';
import anecdotesService from '../services/anecdotes';

const key = 'anecdotes';

const useAnecdoteQueries = () => {
  const queryClient = useQueryClient();
  const dispatchNotificationAction = useUpdateAtom(notification.dispatch);

  const getAll = useQuery(key, anecdotesService.getAll);

  const vote = useMutation({
    mutationFn: anecdotesService.vote,
    onSuccess: (anecdote) => {
      dispatchNotificationAction({ type: 'show', text: `${anecdote.content} voted` });
      queryClient.invalidateQueries(key);
    },
  });

  const create = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: (anecdote) => {
      dispatchNotificationAction({ type: 'show', text: `${anecdote.content} created` });
      queryClient.invalidateQueries(key);
    },
  });

  return {
    getAll,
    vote,
    create,
  };
};

export default useAnecdoteQueries;
