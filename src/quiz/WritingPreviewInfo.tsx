import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/quiz/WritingQuizPageStyle';
import SvgIcon from '../module/SvgIcon';

import {Word} from '../recoil/WordListState';
import {lightTheme} from '../styles/colors';
import BottomNav, {PageType} from '../module/BottomNav';

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
          <Text style={styles.hanzi}>{word}</Text>
        ) : (
          <SvgIcon name={'QuestionSquare'} fill={lightTheme.red} size={30} />
        )}
        <TouchableOpacity style={styles.svgWrapper} onPress={handleShowWord}>
          <SvgIcon
            name={showWord ? 'Unlock' : 'Lock'}
            fill={lightTheme.black}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.intonation}>{intonation}</Text>
      <Text
        textBreakStrategy="balanced"
        lineBreakStrategyIOS="hangul-word"
        style={styles.meaning}>
        {meaning}
      </Text>
    </View>
  );
};
export default WritingPreviewInfo;
