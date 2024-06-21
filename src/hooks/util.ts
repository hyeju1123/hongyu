import {useCallback} from 'react';
import useToast from './toast';
import Voca from '../model/Voca';
import Busu from '../model/Busu';
import {ToastIcon} from '../recoil/ToastState';

const TEXTINPUT_LIMIT_LEN = 250;

export default function Util() {
  const {fireToast} = useToast();

  const getWCLabels = useCallback(
    () => [
      '형용사',
      '부사',
      '조동사',
      '접속사',
      '감탄사',
      '성어',
      '명사',
      '수사',
      '기타',
      '조사',
      '개사',
      '대명사',
      '양사',
      '동사',
    ],
    [],
  );

  const limitTextLength = useCallback(
    (value: string) => {
      if (value.length > TEXTINPUT_LIMIT_LEN) {
        fireToast({
          text: '250자를 넘지 말아주세요.',
          icon: ToastIcon.AbNormal,
          remove: true,
        });
        return true;
      }
      return false;
    },
    [fireToast],
  );

  const shuffleArray = useCallback((array: any[]) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }, []);

  const convertToWord = useCallback((word: Voca | Busu) => {
    if (word instanceof Voca) {
      return {
        _id: word._id,
        word: word.word,
        meaning: word.meaning,
        intonation: word.intonation,
        bookmarked: word.bookmarked,
        wordclass: word.wordclass,
        level: word.level,
        explanation: word.explanation,
        info: '',
        isBusu: false,
        progress: word.progress,
      };
    } else {
      return {
        _id: word._id,
        word: word.busu,
        meaning: word.xunyin,
        intonation: word.yin,
        bookmarked: word.bookmarked,
        wordclass: word.sample,
        level: word.stroke,
        explanation: word.explanation,
        info: word.info,
        isBusu: true,
        progress: 0,
      };
    }
  }, []);

  return {
    getWCLabels,
    limitTextLength,
    shuffleArray,
    convertToWord,
  };
}
