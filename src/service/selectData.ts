import Realm from 'realm';
import Voca from '../model/Voca';
import Busu from '../model/Busu';

export const selectWord = (realm: Realm, id: number): Voca => {
  console.log('selectword is called');
  const result = realm.objects<Voca>('Voca').filtered('_id == $0', id)[0];
  return result as Voca;
};

export const selectBusu = (realm: Realm, id: number): Busu => {
  console.log('selectbusu is called');
  const result = realm.objects<Busu>('Busu').filtered('_id == $0', id)[0];
  return result as Busu;
};

export const searchWord = (realm: Realm, input: string): Voca[] => {
  console.log('searchWord is called');
  if (!input) {
    console.log('not data');
    return [];
  }
  const result = realm
    .objects<Voca>('Voca')
    .filtered('word CONTAINS[c] $0', input)
    .slice();
  return result;
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

export const countBusuByStroke = (realm: Realm) => {
  console.log('call countBusuByStroke');

  const allBusu = realm.objects<Busu>('Busu');
  return allBusu.reduce<{[key: number]: number}>((accumulator, busu) => {
    const stroke: number = busu.stroke - 1;
    accumulator[stroke] = (accumulator[stroke] || 0) + 1;
    return accumulator;
  }, {});
};
