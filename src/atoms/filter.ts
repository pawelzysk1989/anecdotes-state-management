import { atom } from 'jotai';

const baseAtom = atom('');
const valueAtom = atom((get) => get(baseAtom));
const updateAtom = atom(null, (_get, set, newValue: string) => {
  set(baseAtom, newValue);
});

export default {
  value: valueAtom,
  update: updateAtom,
};
