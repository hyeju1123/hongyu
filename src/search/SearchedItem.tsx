import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {useRecoilValue} from 'recoil';
import {busuState, vocaState} from '../recoil/WordListState';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/search/SearchPageStyle';

type SearchedItemProps = {
  id: number;
  isBusu: boolean;
  moveToDetailPage: (id: number, isBusu: boolean) => void;
};

function SearchedItem({
  id,
  isBusu,
  moveToDetailPage,
}: SearchedItemProps): JSX.Element {
  const {
    colors: {textPrimary, deepShadow, ongoingState, background},
  } = useTheme();
  const wordItem = useRecoilValue(isBusu ? busuState(id) : vocaState(id));
  const {word, level, intonation, meaning} = wordItem;

  return (
    <TouchableOpacity
      onPress={() => moveToDetailPage(id, isBusu)}
      style={[styles.resultBar, {borderBottomColor: ongoingState}]}>
      <Text style={[styles.text, {color: textPrimary}]}>{word}</Text>
      <Text style={[styles.text, {color: textPrimary}]}>{intonation}</Text>
      <Text
        style={[styles.meaningText, {color: deepShadow}]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {meaning}
      </Text>
      <Text
        style={[
          styles.levelText,
          {backgroundColor: textPrimary, color: background},
        ]}>
        {level}
        {isBusu ? '획' : '급'}
      </Text>
    </TouchableOpacity>
  );
}

export default memo(SearchedItem);
