import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {useRecoilValue} from 'recoil';
import {busuState, vocaState} from '../recoil/WordListState';

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
  const wordItem = useRecoilValue(isBusu ? busuState(id) : vocaState(id));
  const {word, level, intonation, meaning} = wordItem;

  return (
    <TouchableOpacity
      onPress={() => moveToDetailPage(id, isBusu)}
      style={styles.resultBar}>
      <Text style={styles.text}>{word}</Text>
      <Text style={styles.text}>{intonation}</Text>
      <Text style={styles.meaningText} numberOfLines={1} ellipsizeMode="tail">
        {meaning}
      </Text>
      <Text style={styles.levelText}>
        {level}
        {isBusu ? '획' : '급'}
      </Text>
    </TouchableOpacity>
  );
}

export default memo(SearchedItem);
