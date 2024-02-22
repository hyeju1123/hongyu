import React, {memo, useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import SvgIcon from './SvgIcon';
import BookmarkButton, {ButtonSize} from './BookmarkButton';

import {useRecoilValue} from 'recoil';
import useToast from '../hooks/toast';
import {ToastIcon} from '../recoil/ToastState';
import {busuState, vocaState} from '../recoil/WordListState';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/module/BottomNavStyle';

export enum PageType {
  VOCA = 'voca',
  BUSU = 'busu',
  QUIZ = 'quiz',
}

type BottomNavType = {
  id?: number;
  page: number;
  totalLen: number;
  pageType: PageType;
  large?: boolean;
  callback: (newPage: number) => void;
};

function BottomNav({
  id = -1,
  page,
  totalLen,
  pageType,
  large = true,
  callback,
}: BottomNavType): JSX.Element {
  const {
    colors: {textPrimary},
  } = useTheme();
  const {BUSU, QUIZ} = PageType;
  const {fireToast} = useToast();
  const wordState = pageType === BUSU ? busuState : vocaState;
  const {word, bookmarked} = useRecoilValue(wordState(id));

  const notifyPageEnd = useCallback(
    (isForward: boolean) => {
      const text = `${isForward ? '마지막' : '첫번째'} 페이지입니다`;
      fireToast({
        text,
        icon: ToastIcon.AbNormal,
        remove: true,
      });
    },
    [fireToast],
  );

  const handlePageMove = useCallback(
    (isForward: boolean) => {
      const isLastPage = page === totalLen - 1;
      const isFirstPage = page === 0;

      if (isForward) {
        isLastPage && !QUIZ ? notifyPageEnd(isForward) : callback(page + 1);
      } else {
        isFirstPage ? notifyPageEnd(isForward) : callback(page - 1);
      }
    },
    [notifyPageEnd, callback, page, totalLen, QUIZ],
  );

  return (
    <View style={[styles.bottomNav, !large && styles.smallSize]}>
      <TouchableOpacity
        style={styles.horizonFlip}
        onPress={() => handlePageMove(false)}>
        <SvgIcon
          name="Play"
          size={large ? styles.largeVerPlay.width : styles.smallVerPlay.width}
          fill={textPrimary}
        />
      </TouchableOpacity>
      {large && (
        <BookmarkButton
          id={id}
          word={word}
          bookmarked={bookmarked}
          isBusu={false}
          size={large ? ButtonSize.Large : ButtonSize.Small}
        />
      )}
      <TouchableOpacity onPress={() => handlePageMove(true)}>
        <SvgIcon
          name="Play"
          size={large ? styles.largeVerPlay.width : styles.smallVerPlay.width}
          fill={textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}

export default memo(BottomNav);
