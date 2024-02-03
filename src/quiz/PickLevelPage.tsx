import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CategoryCardWrapper from '../module/CategoryCardWrapper';
import {InfoType} from '../module/CategoryCardWrapper';
import * as Icons from '../styles/svgIndex';

import styles from '../styles/quiz/QuizTypePageStyle';

type PickLevelPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'PickLevelPage'
>;

function PickLevelPage({
  navigation,
  route: {
    params: {quizType},
  },
}: PickLevelPageProps): JSX.Element {
  const {navigate} = navigation;
  const levels = [1, 2, 3, 4, 5, 6];

  const levelData: InfoType<string>[] = levels.map(level => ({
    title: `HSK ${level}급`,
    desc: `${level}급 시험보기`,
    icon: `Circle${level}` as keyof typeof Icons,
    navData: level.toString(),
  }));

  const moveToCategory = (level: string) => {
    navigate('PickCategoryPage', {level: Number(level), quizType});
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <CategoryCardWrapper nav={moveToCategory} infos={levelData} />
    </SafeAreaView>
  );
}

export default PickLevelPage;
