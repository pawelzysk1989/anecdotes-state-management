import { atom } from 'jotai';

type State = null | string;
type Action = { type: 'show'; text: string } | { type: 'hide' };

const baseAtom = atom<State>(null);
const valueAtom = atom((get) => get(baseAtom));
const showAtom = atom(null, (_get, set, text: string) => {
  set(baseAtom, text);
});
const hideAtom = atom(null, (_get, set) => {
  set(baseAtom, null);
});

const dispatchAtom = atom(null, (get, set, action: Action) => {
  switch (action.type) {
    case 'show': {
      set(showAtom, action.text);
      setTimeout(() => {
        set(hideAtom);
      }, 5000);
      break;
    }
    case 'hide': {
      set(hideAtom);
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
