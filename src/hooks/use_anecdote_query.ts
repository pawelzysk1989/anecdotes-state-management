import { useMutation, useQuery, useQueryClient } from 'react-query';

import anecdotesService from '../services/anecdotes';

const key = 'anecdotes';

const useGetAll = () => {
  const getAll = useQuery(key, anecdotesService.getAll);
  return getAll;
};

const useGet = (id: string) => {
  const get = useQuery([key, { id }], () => anecdotesService.get(id));
  return get;
};

const useCreate = () => {
  const queryClient = useQueryClient();

  const create = useMutation(anecdotesService.create, {
    onSuccess: (_anecdote) => {
      queryClient.invalidateQueries(key);
    },
  });

  return create;
};

const useVote = () => {
  const queryClient = useQueryClient();

  const vote = useMutation(anecdotesService.vote, {
    onSuccess: (_anecdote) => {
      queryClient.invalidateQueries(key);
    },
  });
  return vote;
};

export default {
  getAll: useGetAll,
  get: useGet,
  create: useCreate,
  vote: useVote,
};
