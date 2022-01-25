import { useAtomValue } from 'jotai/utils';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import filter from '../atoms/filter';
import useAnecdotes from '../hooks/use_anecdotes';
import Filter from './Filter';
import Section from './Section';

const AnecdoteList = () => {
  const filterValue = useAtomValue(filter.value);
  const anecdotes = useAnecdotes.all();

  const filteredAnecdotes = useMemo(
    () =>
      anecdotes
        .filter((anecdote) => anecdote.content.includes(filterValue))
        .sort((a, b) => b.votes - a.votes),
    [filterValue, anecdotes],
  );

  return (
    <Section title="anecdotes">
      <Filter />
      <ul>
        {filteredAnecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default AnecdoteList;
