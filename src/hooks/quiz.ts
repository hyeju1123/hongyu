import {useCallback} from 'react';
import useUtil from './util';
import Voca from '../model/Voca';
import {Word} from '../recoil/WordListState';

type WordDictProps = {
  _id: number;
  word: string;
  meaning: string;
};

export default function Quiz() {
  const {shuffleArray} = useUtil();

  const getWordDict = useCallback((words: Voca[] | Word[]) => {
    const wordDict: WordDictProps[] = [];

    words.forEach(({_id, word, meaning}) => {
      wordDict.push({_id, word, meaning});
    });
    return wordDict;
  }, []);

  const getWordList = useCallback(
    (words: Voca[] | Word[], shuffle = true) => {
      const wordList: string[] = [];
      words.forEach(({word, meaning}) => {
        wordList.push(word, meaning);
      });
      return shuffle ? shuffleArray(wordList) : wordList;
    },
    [shuffleArray],
  );

  return {
    getWordDict,
    getWordList,
  };
}
