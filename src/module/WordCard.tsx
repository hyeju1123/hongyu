import React, {memo} from 'react';
import {Text, View} from 'react-native';

import Card from './Card';
import SoundButton from './SoundButton';
import BookmarkButton from './BookmarkButton';
import styles from '../styles/module/WordCardStyle';

import {useRecoilValue} from 'recoil';
import {busuState, vocaState} from '../recoil/WordListState';
import WordCardContent from './WordCardContent';

function WordCard({id, isBusu}: {id: number; isBusu: boolean}): JSX.Element {
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
      <WordCardContent
        isBusu={isBusu}
        meaning={meaning}
        intonation={intonation}
      />
    </Card>
  );
}

export default memo(WordCard);
