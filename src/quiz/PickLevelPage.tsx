import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CategoryCardWrapper from '../module/CategoryCardWrapper';
import images from '../styles/images';
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
    desc: '',
    icon: images.number[level],
    navData: level.toString(),
  }));

  const moveToCategory = (level: string) => {
    navigate('CategoryPage', {level: Number(level), forQuiz: true});
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
