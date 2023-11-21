import Realm from 'realm';
import {selectWord} from './selectData';

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
