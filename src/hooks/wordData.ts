import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {useVoca} from '../providers/VocaProvider';
import useUtil from './util';
import {
  BookedNav,
  WordNav,
  bookedNavState,
  wordNavState,
} from '../recoil/WordNavState';
import {useCallback, useEffect} from 'react';
import {wordListState} from '../recoil/WordListState';

export default function useWordData(category: string) {
  const {
    getVocasByCategory,
    getBusuesByStroke,
    getBookmarkedVocas,
    getBookmarkedBusues,
  } = useVoca();
  const {convertToWord} = useUtil();
  const {navType, level} = useRecoilValue(wordNavState);
  const {bookedNavType, bookedLevel} = useRecoilValue(bookedNavState);
  const [wordsFromRecoil, setWords] = useRecoilState(wordListState);
  const resetWords = useResetRecoilState(wordListState);

  const fetchBookmarkedData = useCallback(() => {
    return bookedNavType === BookedNav.Voca
      ? getBookmarkedVocas(bookedLevel)
      : getBookmarkedBusues();
  }, [bookedNavType, bookedLevel, getBookmarkedVocas, getBookmarkedBusues]);

  const fetchBusuData = useCallback(() => {
    return getBusuesByStroke(Number(category));
  }, [category, getBusuesByStroke]);

  const fetchHSKData = useCallback(() => {
    return getVocasByCategory(level, category);
  }, [level, category, getVocasByCategory]);

  const fetchData = useCallback(() => {
    if (navType === WordNav.Book) {
      return fetchBookmarkedData();
    } else if (navType === WordNav.Busu) {
      return fetchBusuData();
    } else {
      return fetchHSKData();
    }
  }, [navType, fetchBookmarkedData, fetchBusuData, fetchHSKData]);

  const getWordData = useCallback(() => {
    return fetchData().map(word => convertToWord(word));
  }, [fetchData, convertToWord]);

  useEffect(() => {
    const words = getWordData();
    setWords(words);
    return () => {
      resetWords();
    };
  }, [getWordData, setWords, resetWords]);

  return {getWordData, wordsFromRecoil};
}
