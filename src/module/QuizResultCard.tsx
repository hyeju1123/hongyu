import React, {memo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SvgIcon from './SvgIcon';
import Voca from '../model/Voca';

import Card from './Card';
import SoundButton from './SoundButton';
import WordCardContent from './WordCardContent';

import useToast from '../hooks/toast';
import {useVoca} from '../providers/VocaProvider';
import {ToastIcon} from '../recoil/ToastState';

import {lightTheme} from '../styles/colors';
import styles from '../styles/module/WordCardStyle';

function QuizResultCard({
  voca,
  isCorrected,
}: {
  voca: Voca;
  isCorrected: boolean;
}): JSX.Element {
  const {_id, word, bookmarked, level, meaning, intonation} = voca;
  const {green, warning} = lightTheme;
  const {fireToast} = useToast();
  const {updateBookmark} = useVoca();
  const [book, setBook] = useState(bookmarked);

  const handleBookmark = () => {
    updateBookmark(_id);
    setBook(prev => !prev);
    fireToast({
      text: `'내 단어장'에 '${word}'를 ${book ? '삭제' : '저장'}했습니다.`,
      icon: ToastIcon.Normal,
      remove: true,
    });
  };

  return (
    <Card key={_id} underdressing={false}>
      <View style={styles.dirRow}>
        <View>
          <SvgIcon
            name={isCorrected ? 'Circle' : 'Cross'}
            fill={isCorrected ? green : warning}
            size={18}
          />
          <TouchableOpacity onPress={handleBookmark}>
            <SvgIcon name={book ? 'LanternOn' : 'LanternOff'} size={18} />
          </TouchableOpacity>
        </View>
        <SoundButton level={level} word={word} />
      </View>
      <Text style={styles.hanzi}>{word}</Text>
      <WordCardContent isBusu meaning={meaning} intonation={intonation} />
    </Card>
  );
}

export default memo(QuizResultCard);
