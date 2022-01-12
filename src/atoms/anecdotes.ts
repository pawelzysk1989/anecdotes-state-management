import { atom } from 'jotai';

import { Anecdote } from '../types/anecdote';
import notificationAtoms from './notification';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote: string): Anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

type State = typeof initialState;
type Action = { type: 'vote'; id: string } | { type: 'create'; content: string };

const baseAtom = atom<State>(initialState);
const valueAtom = atom((get) => get(baseAtom));
const voteAtom = atom(null, (_get, set, id: string) => {
  set(baseAtom, (state) =>
    state.map((anecdote) =>
      anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote,
    ),
  );
});
const createAtom = atom(null, (_, set, content: string) => {
  set(baseAtom, (state) => [
    {
      id: getId(),
      content,
      votes: 0,
    },
    ...state,
  ]);
});

const dispatchAtom = atom(null, (get, set, action: Action) => {
  switch (action.type) {
    case 'vote': {
      set(voteAtom, action.id);
      const anecdote = get(baseAtom).find((anec) => anec.id === action.id);
      set(notificationAtoms.dispatch, {
        type: 'show',
        text: `you voted '${anecdote?.content}'`,
      });
      break;
    }

    case 'create': {
      set(createAtom, action.content);
      set(notificationAtoms.dispatch, {
        type: 'show',
        text: `you created '${action.content}'`,
      });
      break;
    }

    default:
      throw new Error('unknown action');
  }
});

export default {
  value: valueAtom,
  dispatch: dispatchAtom,
};
