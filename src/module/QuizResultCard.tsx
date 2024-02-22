import React, {memo} from 'react';
import {Text, View} from 'react-native';

import Card from './Card';
import SoundButton from './SoundButton';
import BookmarkButton from './BookmarkButton';
import WordCardContent from './WordCardContent';
import {useRecoilValue} from 'recoil';
import {vocaState} from '../recoil/WordListState';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/module/WordCardStyle';

function QuizResultCard({
  id,
  isCorrected,
}: {
  id: number;
  isCorrected: boolean;
}): JSX.Element {
  const {
    colors: {healthy, warning, transparent},
  } = useTheme();
  const vocaItem = useRecoilValue(vocaState(id));
  const {_id, word, bookmarked, level, meaning, intonation} = vocaItem;

  return (
    <Card key={_id} underColor={transparent}>
      <View style={styles.dirRow}>
        <BookmarkButton
          id={_id}
          word={word}
          bookmarked={bookmarked}
          isBusu={false}
        />
        <SoundButton level={level} word={word} />
      </View>
      <Text style={[styles.hanzi, {color: isCorrected ? healthy : warning}]}>
        {word}
      </Text>
      <WordCardContent isBusu meaning={meaning} intonation={intonation} />
    </Card>
  );
}

export default memo(QuizResultCard);
