import React, {createContext, useContext, useCallback} from 'react';
import type {PropsWithChildren} from 'react';
import {useRealm} from '../../RealmConfigContext';

import Voca from '../model/Voca';

import Busu from '../model/Busu';

export type UpdateVocaContent = {
  word: string;
  meaning: string;
  intonation: string;
  wordclass: string;
  explanation: string | undefined;
};

type VocaContextType = {
  getVoca: (_id: number) => Voca;
  getVocasByLevel: (level: number) => Voca[];
  getVocasBySearch: (input: string) => (Busu | Voca)[];
  getVocasByCategory: (level: number, category: string) => Voca[];
  countVocaByCategory: (level: number) => {[key: string]: number};
  getVocasByMultipleCategory: (level: number, categories: string[]) => Voca[];
  getBookmarkedVocas: (level: number) => Voca[];
  getBusu: (_id: number) => Busu;
  getBusuesByStroke: (stroke: number) => Busu[];
  getBookmarkedBusues: () => Busu[];
  countBusuByStroke: () => {[key: number]: number};
  updateVoca: (_id: number, data: UpdateVocaContent) => void;
  updateBookmark: (_id: number) => void;
  updateBusuBookmark: (_id: number) => void;
  updateExplanation: (_id: number, explanation: string) => void;
  updateBusuExplanation: (_id: number, explanation: string) => void;
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

export const getDefaultBusu = () => {
  return {
    _id: 0,
    stroke: 1,
    busu: '',
    yin: '',
    xunyin: '',
    sample: '',
    info: '',
    explanation: '',
    bookmarked: false,
  };
};

const VocaContext = createContext<VocaContextType>({
  getVoca: () => {
    return getDefaultWord() as Voca;
  },
  getVocasByLevel: () => {
    return [];
  },
  getVocasBySearch: () => {
    return [];
  },
  getVocasByCategory: () => {
    return [];
  },
  countVocaByCategory: () => {
    return {'': 1};
  },
  getVocasByMultipleCategory: () => {
    return [];
  },
  getBookmarkedVocas: () => {
    return [];
  },
  getBusu: () => {
    return getDefaultBusu() as Busu;
  },
  getBusuesByStroke: () => {
    return [];
  },
  getBookmarkedBusues: () => {
    return [];
  },
  countBusuByStroke: () => {
    return {1: 1};
  },
  updateVoca: () => {},
  updateBookmark: () => {},
  updateBusuBookmark: () => {},
  updateExplanation: () => {},
  updateBusuExplanation: () => {},
});

export function VocaProvider({children}: PropsWithChildren) {
  const realm = useRealm();

  /**
   * select Functions
   */
  const getVoca = useCallback(
    (_id: number) => {
      console.log('getVoca called');
      const voca = realm.objects<Voca>('Voca').filtered('_id == $0', _id)[0];
      return voca || getDefaultWord();
    },
    [realm],
  );

  const getVocasByLevel = useCallback(
    (level: number) => {
      return realm
        .objects<Voca>('Voca')
        .filtered('level == $0 DISTINCT(theme)', level)
        .slice();
    },
    [realm],
  );

  const countVocaByCategory = useCallback(
    (level: number) => {
      const vocasInLevel = realm
        .objects<Voca>('Voca')
        .filtered('level == $0', level);
      return vocasInLevel.reduce<{[key: string]: number}>(
        (accumulator, voca) => {
          const theme: string = voca.theme;
          accumulator[theme] = (accumulator[theme] || 0) + 1;
          return accumulator;
        },
        {},
      );
    },
    [realm],
  );

  const getVocasByCategory = useCallback(
    (level: number, category: string) => {
      return realm
        .objects<Voca>('Voca')
        .filtered('level == $0 && theme == $1', level, category)
        .slice();
    },
    [realm],
  );

  const getVocasByMultipleCategory = useCallback(
    (level: number, categories: string[]) => {
      return realm
        .objects<Voca>('Voca')
        .filtered('level == $0 && theme IN $1', level, categories)
        .slice();
    },
    [realm],
  );

  const getBookmarkedVocas = useCallback(
    (level: number) => {
      return level === 0
        ? realm.objects<Voca>('Voca').filtered('bookmarked == $0', true).slice()
        : realm
            .objects<Voca>('Voca')
            .filtered('level == $0 && bookmarked == $1', level, true)
            .slice();
    },
    [realm],
  );

  const getVocasBySearch = useCallback(
    (input: string) => {
      if (!input) {
        return [];
      }
      const buses = realm
        .objects<Busu>('Busu')
        .filtered('busu CONTAINS[c] $0', input)
        .slice();
      const vocas = realm
        .objects<Voca>('Voca')
        .filtered('word CONTAINS[c] $0', input)
        .slice();
      return [...buses, ...vocas];
    },
    [realm],
  );

  const getBusu = useCallback(
    (_id: number) => {
      const busu = realm.objects<Busu>('Busu').filtered('_id == $0', _id)[0];
      return busu || getDefaultBusu();
    },
    [realm],
  );

  const getBusuesByStroke = useCallback(
    (stroke: number) => {
      return realm
        .objects<Busu>('Busu')
        .filtered('stroke == $0', stroke)
        .slice();
    },
    [realm],
  );

  const getBookmarkedBusues = useCallback(() => {
    return realm
      .objects<Busu>('Busu')
      .filtered('bookmarked == $0', true)
      .slice();
  }, [realm]);

  const countBusuByStroke = useCallback(() => {
    const allBusu = realm.objects<Busu>('Busu');
    return allBusu.reduce<{[key: number]: number}>((accumulator, busu) => {
      const stroke: number = busu.stroke - 1;
      accumulator[stroke] = (accumulator[stroke] || 0) + 1;
      return accumulator;
    }, {});
  }, [realm]);

  /**
   * update Functions
   */
  const updateVoca = useCallback(
    (_id: number, data: UpdateVocaContent) => {
      const voca = getVoca(_id);
      const {word, intonation, wordclass, meaning, explanation} = data;
      realm.write(() => {
        voca.word = word;
        voca.intonation = intonation;
        voca.wordclass = wordclass;
        voca.meaning = meaning;
        voca.explanation = explanation;
      });
    },
    [realm, getVoca],
  );

  const updateBookmark = useCallback(
    (_id: number) => {
      const voca = getVoca(_id);
      realm.write(() => {
        voca.bookmarked = !voca.bookmarked;
      });
    },
    [realm, getVoca],
  );

  const updateBusuBookmark = useCallback(
    (_id: number) => {
      const busu = getBusu(_id);
      realm.write(() => {
        busu.bookmarked = !busu.bookmarked;
      });
    },
    [realm, getBusu],
  );

  const updateExplanation = useCallback(
    (_id: number, explanation: string) => {
      const voca = getVoca(_id);
      realm.write(() => {
        voca.explanation = explanation;
      });
    },
    [realm, getVoca],
  );

  const updateBusuExplanation = useCallback(
    (_id: number, explanation: string) => {
      const busu = getBusu(_id);
      realm.write(() => {
        busu.explanation = explanation;
      });
    },
    [realm, getBusu],
  );

  const contextValue = {
    getVoca,
    getVocasByLevel,
    getVocasBySearch,
    getVocasByCategory,
    countVocaByCategory,
    getVocasByMultipleCategory,
    getBookmarkedVocas,
    getBusu,
    getBusuesByStroke,
    getBookmarkedBusues,
    countBusuByStroke,
    updateVoca,
    updateBookmark,
    updateBusuBookmark,
    updateExplanation,
    updateBusuExplanation,
  };

  return (
    <VocaContext.Provider value={contextValue}>{children}</VocaContext.Provider>
  );
}

export const useVoca = () => useContext(VocaContext);
