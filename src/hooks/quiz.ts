import {useCallback} from 'react';
import useUtil from './util';

import Voca from '../model/Voca';
import {Word} from '../recoil/WordListState';
import {InfoType} from '../module/CategoryCardWrapper';
import {QuizPageStackParamList} from '../navigation/QuizNavigation';

type WordDictProps = {
  _id: number;
  word: string;
  meaning: string;
};

export default function Quiz() {
  const {shuffleArray} = useUtil();

  const getQuizTypeData = useCallback(
    (): InfoType<keyof QuizPageStackParamList>[] => [
      {
        title: '짝 맞추기',
        desc: '제한시간 안에 단어와 뜻을 짝 맞춰보세요.',
        icon: 'Matching',
        navData: 'MatchingQuizPage',
      },
      {
        title: '뜻 고르기',
        desc: '단어와 일치하는 뜻을 골라보세요.',
        icon: 'Picking',
        navData: 'PickingQuizPage',
      },
      {
        title: '듣기 연습',
        desc: '음성을 듣고 해당하는 단어를 골라보세요.',
        icon: 'Listening',
        navData: 'ListeningQuizPage',
      },
      {
        title: '필기 연습',
        desc: '뜻에 맞는 한자를 적은 후\n자물쇠 버튼을 눌러 정답을 확인해보세요.',
        icon: 'Writing',
        navData: 'WritingQuizPage',
      },
    ],
    [],
  );

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
    getQuizTypeData,
    getWordDict,
    getWordList,
  };
}
