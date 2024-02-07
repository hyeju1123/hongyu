import React, {memo} from 'react';
import {Text, View} from 'react-native';
import SvgIcon from './SvgIcon';

import Card from './Card';
import SoundButton from './SoundButton';
import WordCardContent from './WordCardContent';

import {lightTheme} from '../styles/colors';
import styles from '../styles/module/WordCardStyle';
import {useRecoilValue} from 'recoil';
import {vocaState} from '../recoil/WordListState';
import BookmarkButton from './BookmarkButton';

function QuizResultCard({
  id,
  isCorrected,
}: {
  id: number;
  isCorrected: boolean;
}): JSX.Element {
  const vocaItem = useRecoilValue(vocaState(id));
  const {_id, word, bookmarked, level, meaning, intonation} = vocaItem;
  const {green, warning} = lightTheme;

  return (
    <Card key={_id} underdressing={false}>
      <View style={styles.dirRow}>
        <View>
          <SvgIcon
            name={isCorrected ? 'Circle' : 'Cross'}
            fill={isCorrected ? green : warning}
            size={18}
          />
          <BookmarkButton
            id={_id}
            word={word}
            bookmarked={bookmarked}
            isBusu={false}
          />
        </View>
        <SoundButton level={level} word={word} />
      </View>
      <Text style={styles.hanzi}>{word}</Text>
      <WordCardContent isBusu meaning={meaning} intonation={intonation} />
    </Card>
  );
}

export default memo(QuizResultCard);
