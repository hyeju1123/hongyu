import React from 'react';
import {StatusBar, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  QuizPageStackParamList,
  QuizStackParamList,
} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CategoryCardWrapper from '../module/CategoryCardWrapper';
import {InfoType} from '../module/CategoryCardWrapper';

import styles from '../styles/quiz/QuizTypePageStyle';

type QuizTypePageProps = NativeStackScreenProps<
  QuizStackParamList,
  'QuizTypePage'
>;

function QuizTypePage({navigation}: QuizTypePageProps): JSX.Element {
  const {navigate} = navigation;

  const quizTypeData: InfoType<keyof QuizPageStackParamList>[] = [
    {
      title: '짝 맞추기',
      desc: '제한시간 안에 단어와 뜻을 짝 맞춰보세요.',
      icon: 'Matching',
      navData: 'MatchingQuizPage',
    },
    {
      title: '뜻 고르기',
      desc: '단어와 일치하는 뜻을 골라보세요.',
      icon: 'Picking',
      navData: 'MatchingQuizPage',
    },
    {
      title: '듣기 시험',
      desc: '음성을 듣고 해당하는 단어를 골라보세요.',
      icon: 'Listening',
      navData: 'MatchingQuizPage',
    },
    {
      title: '필기 시험',
      desc: '주어진 뜻을 한자로 적어보세요.',
      icon: 'Writing',
      navData: 'WritingQuizPage',
    },
    {
      title: '사자성어',
      desc: '주어진 한자로 사자성어를 완성하세요.',
      icon: 'FourIdiom',
      navData: 'MatchingQuizPage',
    },
  ];

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
