import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/quiz/WritingQuizPageStyle';
import SvgIcon from '../module/SvgIcon';
import useQuiz from '../hooks/quiz';
import {Dir} from '../hooks/quiz';
import {Word} from '../recoil/WordListState';
import {lightTheme} from '../styles/colors';

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
  const {handlePageMove} = useQuiz();
  const {FORWARD, BACKWARD} = Dir;
  const {word, intonation, meaning} = data;
  return (
    <View style={[styles.infoWrapper]}>
      <View style={[styles.buttonWrapper]}>
        <TouchableOpacity
          style={[styles.moveButtonWrapper, styles.horizonFlip]}
          onPress={() =>
            handlePageMove({dir: BACKWARD, index, totalLen, moveCallback})
          }>
          <SvgIcon name="Play" fill={lightTheme.black} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.moveButtonWrapper}
          onPress={() =>
            handlePageMove({dir: FORWARD, index, totalLen, moveCallback})
          }>
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
