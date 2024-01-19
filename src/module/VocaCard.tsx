import React, {memo} from 'react';
import {Text, View} from 'react-native';

import Card from './Card';
import SoundButton from './SoundButton';
import BookmarkButton from './BookmarkButton';
import styles from '../styles/module/WordCardStyle';

import {useRecoilValue} from 'recoil';
import {busuState, vocaState} from '../recoil/WordListState';

function VocaCard({id, isBusu}: {id: number; isBusu: boolean}) {
  const wordItem = useRecoilValue(isBusu ? busuState(id) : vocaState(id));
  const {word, level, intonation, meaning, bookmarked} = wordItem;

  return (
    <Card underdressing={false}>
      <View style={styles.dirRow}>
        <BookmarkButton
          id={id}
          word={word}
          bookmarked={bookmarked}
          isBusu={isBusu}
        />
        {!isBusu && <SoundButton level={level} word={word} />}
      </View>
      <Text style={styles.hanzi}>{word}</Text>
      <Text style={styles.meaningText}>{intonation}</Text>
      <Text style={styles.meaningText}>{meaning}</Text>
    </Card>
  );
}

export default memo(VocaCard);
