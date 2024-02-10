import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import SvgIcon from './SvgIcon';

import styles from '../styles/module/BottomNavStyle';
import {lightTheme} from '../styles/colors';
import {useRecoilValue} from 'recoil';
import {vocaState} from '../recoil/WordListState';
import BookmarkButton, {ButtonSize} from './BookmarkButton';
import {Dir} from '../hooks/quiz';

function BottomNav({
  id,
  handleNav,
}: {
  id: number;
  handleNav: (dir: Dir) => void;
}): JSX.Element {
  const {FORWARD, BACKWARD} = Dir;
  const {word, bookmarked} = useRecoilValue(vocaState(id));

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.horizonFlip}
        onPress={() => handleNav(BACKWARD)}>
        <SvgIcon name="Play" size={40} fill={lightTheme.black} />
      </TouchableOpacity>
      <BookmarkButton
        id={id}
        word={word}
        bookmarked={bookmarked}
        isBusu={false}
        size={ButtonSize.Large}
      />
      <TouchableOpacity onPress={() => handleNav(FORWARD)}>
        <SvgIcon name="Play" size={40} fill={lightTheme.black} />
      </TouchableOpacity>
    </View>
  );
}

export default memo(BottomNav);
