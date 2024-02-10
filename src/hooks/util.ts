import {useCallback} from 'react';
import useToast from './toast';
import Voca from '../model/Voca';
import Busu from '../model/Busu';
import {ToastIcon} from '../recoil/ToastState';
import {InfoType} from '../module/CategoryCardWrapper';
import {QuizPageStackParamList} from '../navigation/QuizNavigation';

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
        icon: 'FourIdiom',
        navData: 'PickingQuizPage',
      },
      {
        title: '듣기 연습',
        desc: '음성을 듣고 해당하는 단어를 골라보세요.',
        icon: 'Listening',
        navData: 'MatchingQuizPage',
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
      };
    }
  }, []);

  return {
    getWCLabels,
    limitTextLength,
    shuffleArray,
    convertToWord,
    getQuizTypeData,
  };
}
