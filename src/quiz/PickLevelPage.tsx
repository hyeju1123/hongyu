import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CategoryCardWrapper from '../module/CategoryCardWrapper';

import {lightTheme} from '../styles/colors';
import styles from '../styles/QuizTypePageStyle';

type PickLevelPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'PickLevelPage'
>;

function PickLevelPage({navigation}: PickLevelPageProps): JSX.Element {
  const {navigate} = navigation;
  const levels = [1, 2, 3, 4, 5, 6];

  const levelData = levels.map(level => ({
    title: `HSK ${level}급`,
    desc: `${level}급 시험보기`,
    icon: `Circle${level}`,
    navData: level.toString(),
  }));

  const moveToCategory = (level: string) => {
    navigate('PickCategoryPage', {level: Number(level)});
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <CategoryCardWrapper
        nav={moveToCategory}
        infos={levelData}
        theme={lightTheme.darkRed}
      />
    </SafeAreaView>
  );
}

export default PickLevelPage;
