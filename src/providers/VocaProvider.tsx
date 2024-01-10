import React, {createContext, useContext, useCallback, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {useRealm} from '../../RealmConfigContext';

import Voca from '../model/Voca';
import {CollectionChangeCallback} from 'realm';

import {useSetRecoilState} from 'recoil';
import {realmState} from '../recoil/RealmState';
import Busu from '../model/Busu';

type VocaContexttype = {
  getVoca: (_id: number) => Voca;
  getVocasByLevel: (level: number) => Voca[];
  getVocasBySearch: (input: string) => (Busu | Voca)[];
  getVocasByCategory: (level: number, category: string) => Voca[];
  getVocasByMultipleCategory: (level: number, categories: string[]) => Voca[];
  getBookmarkedVocas: (level: number) => Voca[];
  getBusu: (_id: number) => Busu;
  getBusuesByStroke: (stroke: number) => Busu[];
  getBookmarkedBusues: () => Busu[];
  countBusuByStroke: () => {[key: number]: number};
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

const VocaContext = createContext<VocaContexttype>({
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
  updateBookmark: () => {},
  updateBusuBookmark: () => {},
  updateExplanation: () => {},
  updateBusuExplanation: () => {},
});

export function VocaProvider({children}: PropsWithChildren) {
  const realm = useRealm();
  const setModifyToggle = useSetRecoilState(realmState);

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

  useEffect(() => {
    const handleVocasChange: CollectionChangeCallback<Voca, [number, Voca]> = (
      _,
      changes,
    ) => {
      console.log(changes);
      setModifyToggle(prev => ({toggleByChange: !prev.toggleByChange}));
      console.log('change!!');
    };

    const nonChangingVocasRef = realm.objects(Voca);
    nonChangingVocasRef.addListener(handleVocasChange);

    return () => {
      console.log('bye');
      return nonChangingVocasRef.removeListener(handleVocasChange);
    };
  }, [realm, setModifyToggle]);

  const contextValue = {
    getVoca,
    getVocasByLevel,
    getVocasBySearch,
    getVocasByCategory,
    getVocasByMultipleCategory,
    getBookmarkedVocas,
    getBusu,
    getBusuesByStroke,
    getBookmarkedBusues,
    countBusuByStroke,
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
