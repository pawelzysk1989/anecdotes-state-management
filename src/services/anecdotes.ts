import axios from 'axios';

import { Anecdote } from '../types/anecdote';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get<Anecdote[]>(baseUrl);
  return response.data;
};

const get = async (id: string) => {
  const response = await axios.get<Anecdote>(`${baseUrl}/${id}`);
  return response.data;
};

const vote = async (anecdote: Anecdote) => {
  const response = await axios.put<Anecdote>(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
  return response.data;
};

const create = async (anecdote: Omit<Anecdote, 'id'>) => {
  const response = await axios.post<Anecdote>(baseUrl, anecdote);
  return response.data;
};

export default { getAll, get, vote, create };
