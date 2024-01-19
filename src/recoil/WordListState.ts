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
  info: string;
  isBusu: boolean;
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
  info: '',
  isBusu: false,
};

export const wordListState = atom<Word[]>({
  key: 'wordList',
  default: [],
});

export const vocaState = atomFamily<Word, number>({
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

export const busuState = atomFamily<Word, number>({
  key: 'busu',
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
