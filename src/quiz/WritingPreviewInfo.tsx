import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import SvgIcon from '../module/SvgIcon';
import {Word} from '../recoil/WordListState';
import BottomNav, {PageType} from '../module/BottomNav';
import {useTheme} from '@react-navigation/native';
import styles from '../styles/quiz/WritingQuizPageStyle';

type WordInformationProps = {
  index: number;
  totalLen: number;
  data: Word;
  showWord: boolean;
  handleShowWord: () => void;
  moveCallback: (newIdx: number) => void;
};

const WritingPreviewInfo: FC<WordInformationProps> = ({
  index,
  totalLen,
  data,
  showWord,
  handleShowWord,
  moveCallback,
}) => {
  const {
    colors: {iconPrimary, textPrimary},
  } = useTheme();
  const {QUIZ} = PageType;
  const {word, intonation, meaning} = data;
  return (
    <View style={[styles.infoWrapper]}>
      <BottomNav
        page={index}
        totalLen={totalLen}
        pageType={QUIZ}
        large={false}
        callback={moveCallback}
      />
      <View style={styles.dirRow}>
        {showWord ? (
          <Text style={[styles.hanzi, {color: textPrimary}]}>{word}</Text>
        ) : (
          <SvgIcon
            name={'QuestionSquare'}
            fill={iconPrimary}
            size={styles.questionSquare.width}
          />
        )}
        <TouchableOpacity style={styles.svgWrapper} onPress={handleShowWord}>
          <SvgIcon
            name={showWord ? 'Unlock' : 'Lock'}
            fill={textPrimary}
            size={styles.lock.width}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.intonation, {color: iconPrimary}]}>
        {intonation}
      </Text>
      <Text
        textBreakStrategy="balanced"
        lineBreakStrategyIOS="hangul-word"
        style={[styles.meaning, {color: textPrimary}]}>
        {meaning}
      </Text>
    </View>
  );
};
export default WritingPreviewInfo;
