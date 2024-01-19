import React, {memo} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import useToast from '../hooks/toast';
import {useVoca} from '../providers/VocaProvider';
import {useSetRecoilState} from 'recoil';
import {busuState, vocaState} from '../recoil/WordListState';

import images from '../styles/images';

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
  const {lanternOn, lanternOff} = images.module;
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
      icon: 'checkedGreen',
      remove: true,
    });
  };

  return (
    <TouchableOpacity onPress={handleBookmark}>
      <Image
        source={bookmarked ? lanternOn : lanternOff}
        style={size === ButtonSize.Small ? styles.small : styles.large}
      />
    </TouchableOpacity>
  );
}

export default memo(BookmarkButton);

const styles = StyleSheet.create({
  small: {
    width: 20,
    height: 20,
  },
  large: {
    width: 50,
    height: 50,
  },
});
