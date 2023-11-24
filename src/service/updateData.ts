import Realm from 'realm';
import {selectWord} from './selectData';

export type VocaContentType = {
  word: string;
  meaning: string;
  intonation: string;
  wordclass: string;
  explanation: string | undefined;
};

export const updateBookmark = (realm: Realm, id: number, bookmark: boolean) => {
  const voca = selectWord(realm, id);
  realm.write(() => {
    voca.bookmarked = bookmark;
  });
};

export const updateExplanation = (
  realm: Realm,
  id: number,
  explanation: string,
) => {
  console.log('useEx is called');
  const voca = selectWord(realm, id);
  realm.write(() => {
    voca.explanation = explanation;
  });
};

export const updateMeaning = (realm: Realm, id: number, meaning: string) => {
  console.log('updateMeaning is called');
  const voca = selectWord(realm, id);
  realm.write(() => {
    voca.meaning = meaning;
  });
};

export const updateVcoa = (realm: Realm, id: number, data: VocaContentType) => {
  const voca = selectWord(realm, id);
  const {word, intonation, wordclass, meaning, explanation} = data;

  realm.write(() => {
    voca.word = word;
    voca.intonation = intonation;
    voca.wordclass = wordclass;
    voca.meaning = meaning;
    voca.explanation = explanation;
  });
};
