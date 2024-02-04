import React, {FC, useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import Canvas from '../module/Canvas';
import SvgIcon from '../module/SvgIcon';

import Voca from '../model/Voca';
import useUtil from '../hooks/util';
import useToast from '../hooks/toast';
import {ToastIcon} from '../recoil/ToastState';
import {useVoca} from '../providers/VocaProvider';

import {lightTheme} from '../styles/colors';
import styles from '../styles/quiz/WritingQuizPageStyle';

enum Dir {
  FORWARD = 'forward',
  BACKWARD = 'backward',
}

type WritingQuizPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'WritingQuizPage'
>;

type WordInformationProps = {
  data: Voca;
  showWord: boolean;
  handleShowWord: () => void;
  handlePageMove: (dir: Dir) => void;
};

const WordInformation: FC<WordInformationProps> = ({
  data,
  showWord,
  handleShowWord,
  handlePageMove,
}) => {
  const {word, intonation, meaning} = data;
  return (
    <View style={[styles.infoWrapper]}>
      <View style={[styles.dirRow, styles.buttonWrapper]}>
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

function WritingQuizPage({
  navigation: {setOptions},
  route: {
    params: {level, categories},
  },
}: WritingQuizPageProps) {
  const {fireToast} = useToast();
  const {shuffleArray} = useUtil();
  const {getVocasByMultipleCategory} = useVoca();

  const [words, setWords] = useState<Voca[]>([]);
  const [index, setIndex] = useState(0);
  const [showWord, setShowWord] = useState(true);
  const totalLen = useMemo(() => words.length, [words.length]);

  const handlePageMove = (dir: Dir) => {
    const isLastPage = index === totalLen - 1;
    const isFirstPage = index === 0;

    const showToast = (message: string) => {
      fireToast({
        text: message,
        icon: ToastIcon.AbNormal,
        remove: true,
      });
    };

    if (dir === Dir.FORWARD) {
      if (isLastPage) {
        showToast('마지막 페이지입니다');
      } else {
        setIndex(prev => prev + 1);
      }
    }

    if (dir === Dir.BACKWARD) {
      if (isFirstPage) {
        showToast('첫번째 페이지입니다');
      } else {
        setIndex(prev => prev - 1);
      }
    }
  };

  useEffect(() => {
    setWords(shuffleArray(getVocasByMultipleCategory(level, categories)));
  }, [shuffleArray, getVocasByMultipleCategory, level, categories]);

  useEffect(() => {
    setOptions({headerTitle: index + 1 + '/' + totalLen});
  }, [index, totalLen, setOptions]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.infoContainer}>
          <Text style={styles.guideText}>주어진 뜻에 맞는 한자를 써보세요</Text>
          {words.length > 0 && (
            <WordInformation
              data={words[index]}
              showWord={showWord}
              handleShowWord={() => setShowWord(prev => !prev)}
              handlePageMove={handlePageMove}
            />
          )}
        </View>
        <Canvas hanzi={showWord ? words[index]?.word : ''} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default WritingQuizPage;
