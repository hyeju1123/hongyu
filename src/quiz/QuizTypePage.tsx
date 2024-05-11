import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  QuizPageStackParamList,
  RootStackParamList,
} from '../navigation/StackParamListType';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CategoryCardWrapper from '../module/CategoryCardWrapper';
import useQuiz from '../hooks/quiz';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/quiz/QuizTypePageStyle';

type QuizTypePageProps = NativeStackScreenProps<
  RootStackParamList,
  'QuizTypePage'
>;

function QuizTypePage({
  navigation: {navigate},
}: QuizTypePageProps): JSX.Element {
  const {
    colors: {textPrimary},
  } = useTheme();
  const {getQuizTypeData} = useQuiz();
  const quizTypeData = getQuizTypeData();

  const moveToPickLevel = (quizType: keyof QuizPageStackParamList) => {
    navigate('PickLevelPage', {quizType});
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <Text style={[styles.guideText, {color: textPrimary}]}>
        시험 유형을 선택해주세요
      </Text>
      <CategoryCardWrapper nav={moveToPickLevel} infos={quizTypeData} />
    </SafeAreaView>
  );
}

export default QuizTypePage;
