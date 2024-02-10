import {useCallback} from 'react';
import useUtil from './util';
import useToast from './toast';
import Voca from '../model/Voca';
import {Word} from '../recoil/WordListState';
import {ToastIcon} from '../recoil/ToastState';

export enum Dir {
  FORWARD = 'forward',
  BACKWARD = 'backward',
}

type WordDictProps = {
  _id: number;
  word: string;
  meaning: string;
};

type HandlePageMoveProps = {
  dir: Dir;
  index: number;
  totalLen: number;
  moveCallback: (newIdx: number) => void;
};

export default function Quiz() {
  const {fireToast} = useToast();
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

  const handlePageMove = ({
    dir,
    index,
    totalLen,
    moveCallback,
  }: HandlePageMoveProps) => {
    const isLastPage = index === totalLen - 1;
    const isFirstPage = index === 0;

    const showToast = (message: string) => {
      fireToast({
        text: message,
        icon: ToastIcon.AbNormal,
        remove: true,
      });
    };

    if (dir === Dir.FORWARD) {
      if (isLastPage) {
        showToast('마지막 페이지입니다');
      } else {
        moveCallback(index + 1);
      }
    }

    if (dir === Dir.BACKWARD) {
      if (isFirstPage) {
        showToast('첫번째 페이지입니다');
      } else {
        moveCallback(index - 1);
      }
    }
  };

  return {
    getWordDict,
    getWordList,
    handlePageMove,
  };
}
