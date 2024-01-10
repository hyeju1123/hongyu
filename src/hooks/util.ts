import {useCallback, useState} from 'react';
import useToast from './toast';
import {useVoca} from '../providers/VocaProvider';
import Voca from '../model/Voca';
import Busu from '../model/Busu';

type handleBookmarkProps = {
  setBookmark: (value: React.SetStateAction<boolean>) => void;
  _id: number;
  word: string;
  bookmark: boolean;
  busu?: boolean;
};

type renderedDataProps<T> = {
  count: number;
  items: T[];
};

export default function Util<T extends Voca | Busu>(longData: T[] = []) {
  const {fireToast} = useToast();
  const {updateBookmark, updateBusuBookmark} = useVoca();
  const [renderedData, setRenderedData] = useState<renderedDataProps<T>>({
    count: 10,
    items: longData.slice(0, 10),
  });
  const {items} = renderedData;

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
      if (value.length > 250) {
        fireToast({
          text: '250자를 넘지 말아주세요.',
          icon: 'warning',
          remove: true,
        });
        return true;
      }
      return false;
    },
    [fireToast],
  );

  const handleBookmark = useCallback(
    ({setBookmark, _id, word, bookmark, busu = false}: handleBookmarkProps) => {
      const status = bookmark ? '삭제' : '저장';
      setBookmark(prev => !prev);
      busu ? updateBusuBookmark(_id) : updateBookmark(_id);
      fireToast({
        text: `'${word}'를 '내 단어장'에 ${status}했습니다.`,
        icon: 'checkedGreen',
        remove: true,
      });
    },
    [updateBookmark, updateBusuBookmark, fireToast],
  );

  const loadData = useCallback(() => {
    setRenderedData(({count}) => ({
      count: count + 10,
      items: longData.slice(0, count + 10),
    }));
  }, [longData]);

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

  return {
    getWCLabels,
    limitTextLength,
    handleBookmark,
    items,
    loadData,
    shuffleArray,
  };
}
