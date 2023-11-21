import Realm from 'realm';
import Voca from '../model/Voca';

export const selectWord = (realm: Realm, id: number): Voca => {
  console.log('selectword is called');
  const result = realm.objects<Voca>('Voca').filtered('_id == $0', id)[0];
  return result as Voca;
};

export const getDefaultWord = () => {
  return {
    _id: 0,
    word: '',
    meaning: '',
    intonation: '',
    wordclass: '명사',
    level: 0,
    theme: '',
    explanation: '',
    bookmarked: false,
  };
};
