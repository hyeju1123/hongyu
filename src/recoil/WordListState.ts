import {atom, atomFamily, selectorFamily} from 'recoil';

export type Word = {
  _id: number;
  word: string;
  intonation: string;
  meaning: string;
  bookmarked: boolean;
  wordclass: string;
  level: number;
  explanation: string | undefined;
};

const EmptyWord = {
  _id: 0,
  word: '',
  intonation: '',
  meaning: '',
  bookmarked: false,
  wordclass: '',
  level: 0,
  explanation: '',
};

export const wordListState = atom<Word[]>({
  key: 'wordList',
  default: [],
});

export const wordState = atomFamily<Word, number>({
  key: 'word',
  default: selectorFamily({
    key: 'wordSelector',
    get:
      id =>
      ({get}) => {
        const wordList = get(wordListState);
        const item = wordList.find(w => w._id === id) || EmptyWord;
        return item;
      },
  }),
});
