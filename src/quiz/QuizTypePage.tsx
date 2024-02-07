import React from 'react';
import {StatusBar, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  QuizPageStackParamList,
  QuizStackParamList,
} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CategoryCardWrapper from '../module/CategoryCardWrapper';
import useUtil from '../hooks/util';

import styles from '../styles/quiz/QuizTypePageStyle';

type QuizTypePageProps = NativeStackScreenProps<
  QuizStackParamList,
  'QuizTypePage'
>;

function QuizTypePage({navigation}: QuizTypePageProps): JSX.Element {
  const {navigate} = navigation;
  const {getQuizTypeData} = useUtil();

  const quizTypeData = getQuizTypeData();

  const moveToPickLevel = (quizType: keyof QuizPageStackParamList) => {
    navigate('PickLevelPage', {quizType});
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Text style={styles.guideText}>시험 유형을 선택해주세요</Text>
      <CategoryCardWrapper nav={moveToPickLevel} infos={quizTypeData} />
    </SafeAreaView>
  );
}

export default QuizTypePage;
