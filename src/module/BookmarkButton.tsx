import React, {memo} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import images from '../styles/images';
import {useSetRecoilState} from 'recoil';
import {wordState} from '../recoil/WordListState';

export enum ButtonSize {
  Small = 's',
  Large = 'l',
}

type BookmarkButtonProps = {
  id: number;
  bookmarked: boolean;
  size?: ButtonSize;
};

function BookmarkButton({
  id,
  bookmarked,
  size = ButtonSize.Small,
}: BookmarkButtonProps) {
  const {lanternOn, lanternOff} = images.module;
  const setWordState = useSetRecoilState(wordState(id));

  return (
    <TouchableOpacity
      onPress={() =>
        setWordState(prev => ({...prev, bookmarked: !prev.bookmarked}))
      }>
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
