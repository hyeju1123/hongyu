import React, {memo} from 'react';
import {Text, View} from 'react-native';
import Card from './Card';
import styles from '../styles/module/WordCardStyle';

import BookmarkButton from './BookmarkButton';
import SoundButton from './SoundButton';
import {useRecoilValue} from 'recoil';
import {wordState} from '../recoil/WordListState';

function VocaCard({id}: {id: number}) {
  const wordItem = useRecoilValue(wordState(id));
  const {word, intonation, meaning, bookmarked} = wordItem;

  return (
    <Card underdressing={false}>
      <View style={styles.dirRow}>
        <SoundButton level={id} word={word} />
        <BookmarkButton id={id} bookmarked={bookmarked} />
      </View>
      <Text style={styles.hanzi}>{word}</Text>
      <Text style={styles.meaningText}>{intonation}</Text>
      <Text style={styles.meaningText}>{meaning}</Text>
    </Card>
  );
}

export default memo(VocaCard);
