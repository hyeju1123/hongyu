import React from 'react';
import {TouchableOpacity} from 'react-native';
import SvgIcon from './SvgIcon';
import useToast from '../hooks/toast';
import {ToastIcon} from '../recoil/ToastState';
import {useVoca} from '../providers/VocaProvider';
import {useSetRecoilState} from 'recoil';
import {busuState, vocaState} from '../recoil/WordListState';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/module/BookmarkButtonStyle';

export enum ButtonSize {
  Small = 's',
  Large = 'l',
}

type BookmarkButtonProps = {
  id: number;
  isBusu: boolean;
  word: string;
  bookmarked: boolean;
  size?: ButtonSize;
};

function BookmarkButton({
  id,
  isBusu,
  word,
  bookmarked,
  size = ButtonSize.Small,
}: BookmarkButtonProps) {
  const {dark} = useTheme();
  const {fireToast} = useToast();
  const {updateBookmark, updateBusuBookmark} = useVoca();
  const wordState = isBusu ? busuState : vocaState;
  const setWordState = useSetRecoilState(wordState(id));
  const handleBookmark = () => {
    isBusu ? updateBusuBookmark(id) : updateBookmark(id);
    setWordState(prev => ({...prev, bookmarked: !prev.bookmarked}));
    fireToast({
      text: `'내 단어장'에 '${word}'를 ${
        bookmarked ? '삭제' : '저장'
      }했습니다.`,
      icon: ToastIcon.Normal,
      remove: true,
    });
  };

  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={handleBookmark}>
      <SvgIcon
        name={bookmarked ? 'LanternOn' : dark ? 'LanternOffDark' : 'LanternOff'}
        size={
          size === ButtonSize.Small
            ? styles.smallVer.width
            : styles.largeVer.width
        }
      />
    </TouchableOpacity>
  );
}

export default BookmarkButton;
