import React from 'react';
import {StatusBar, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CategoryCardWrapper from '../module/CategoryCardWrapper';
import images from '../styles/images';
import {lightTheme} from '../styles/colors';
import styles from '../styles/QuizTypePageStyle';

type QuizTypePageProps = NativeStackScreenProps<
  QuizStackParamList,
  'QuizTypePage'
>;

function QuizTypePage({navigation}: QuizTypePageProps): JSX.Element {
  const {navigate} = navigation;
  const {matching, picking, listening, writing, fourIdiom} = images.module;

  const quizTypeData = [
    {title: '짝 맞추기', desc: '단어와 뜻을 짝 맞춰보세요.', icon: matching},
    {
      title: '뜻 고르기',
      desc: '단어와 일치하는 뜻을 골라보세요.',
      icon: picking,
    },
    {
      title: '듣기 시험',
      desc: '음성을 듣고 해당하는 단어를 골라보세요.',
      icon: listening,
    },
    {title: '필기 시험', desc: '주어진 뜻을 한자로 적어보세요.', icon: writing},
    {
      title: '사자성어',
      desc: '주어진 한자로 사자성어를 완성하세요.',
      icon: fourIdiom,
    },
  ];

  const moveToPickLevel = () => {
    navigate('PickLevelPage');
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Text style={styles.guideText}>시험 유형을 선택해주세요</Text>
      <CategoryCardWrapper
        nav={moveToPickLevel}
        infos={quizTypeData}
        theme={lightTheme.darkRed}
      />
    </SafeAreaView>
  );
}

export default QuizTypePage;
