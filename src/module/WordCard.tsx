import React from 'react';
import {Text, View} from 'react-native';

import Card from './Card';
import SoundButton from './SoundButton';
import BookmarkButton from './BookmarkButton';
import ProgressButton from './ProgressButton';

import {useRecoilValue} from 'recoil';
import {busuState, vocaState} from '../recoil/WordListState';
import WordCardContent from './WordCardContent';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/module/WordCardStyle';

function WordCard({
  id,
  isBusu,
  priorTouched,
}: {
  id: number;
  isBusu: boolean;
  priorTouched: number[];
}): JSX.Element {
  const {
    colors: {transparent, textPrimary},
  } = useTheme();
  const wordItem = useRecoilValue(isBusu ? busuState(id) : vocaState(id));
  const {word, level, intonation, meaning, bookmarked, progress} = wordItem;

  return (
    <Card underColor={transparent}>
      <View style={styles.dirRow}>
        <View style={styles.dirCol}>
          <BookmarkButton
            id={id}
            word={word}
            bookmarked={bookmarked}
            isBusu={isBusu}
          />
          {!isBusu && (
            <ProgressButton dot wordItem={wordItem} progress={progress} />
          )}
        </View>
        {!isBusu && <SoundButton level={level} word={word} />}
      </View>
      <Text style={[styles.hanzi, {color: textPrimary}]}>{word}</Text>
      <WordCardContent
        id={id}
        isBusu={isBusu}
        meaning={meaning}
        intonation={intonation}
        priorTouched={priorTouched}
      />
    </Card>
  );
}

export default WordCard;
