import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Dir} from './WritingQuizPage';
import styles from '../styles/quiz/WritingQuizPageStyle';
import SvgIcon from '../module/SvgIcon';
import Voca from '../model/Voca';
import {Word} from '../recoil/WordListState';
import {lightTheme} from '../styles/colors';

type WordInformationProps = {
  data: Voca | Word;
  showWord: boolean;
  handleShowWord: () => void;
  handlePageMove: (dir: Dir) => void;
};

const WritingPreviewInfo: FC<WordInformationProps> = ({
  data,
  showWord,
  handleShowWord,
  handlePageMove,
}) => {
  const {word, intonation, meaning} = data;
  return (
    <View style={[styles.infoWrapper]}>
      <View style={[styles.buttonWrapper]}>
        <TouchableOpacity
          style={[styles.svgWrapper, styles.horizonFlip]}
          onPress={() => handlePageMove(Dir.BACKWARD)}>
          <SvgIcon name="Play" fill={lightTheme.black} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.svgWrapper}
          onPress={() => handlePageMove(Dir.FORWARD)}>
          <SvgIcon name="Play" fill={lightTheme.black} size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.dirRow}>
        {showWord ? (
          <>
            <Text style={styles.hanzi}>{word}</Text>
            <TouchableOpacity
              style={styles.svgWrapper}
              onPress={handleShowWord}>
              <SvgIcon name="Unlock" fill={lightTheme.black} size={25} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <SvgIcon name={'QuestionSquare'} fill={lightTheme.red} size={30} />
            <TouchableOpacity
              style={styles.svgWrapper}
              onPress={handleShowWord}>
              <SvgIcon name="Lock" fill={lightTheme.black} size={25} />
            </TouchableOpacity>
          </>
        )}
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
