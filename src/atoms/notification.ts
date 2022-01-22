import { atom } from 'jotai';

type State = null | string;

const baseAtom = atom<State>(null);
const valueAtom = atom((get) => get(baseAtom));
const showAtom = atom(null, (_get, set, text: string) => {
  set(baseAtom, text);
});
const hideAtom = atom(null, (_get, set) => {
  set(baseAtom, null);
});

export default {
  value: valueAtom,
  show: showAtom,
  hide: hideAtom,
};
