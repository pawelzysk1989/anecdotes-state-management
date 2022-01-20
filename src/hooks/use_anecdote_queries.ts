import { useMutation, useQuery, useQueryClient } from 'react-query';

import anecdotesService from '../services/anecdotes';

const key = 'anecdotes';

const useAnecdoteQueries = () => {
  const queryClient = useQueryClient();

  const getAll = useQuery(key, anecdotesService.getAll);

  const vote = useMutation({
    mutationFn: anecdotesService.vote,
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
  });

  const create = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: () => {
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
