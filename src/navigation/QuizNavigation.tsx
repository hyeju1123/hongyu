import React from 'react';

import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootNavigation';
import QuizTypePage from '../quiz/QuizTypePage';
import PickLevelPage from '../quiz/PickLevelPage';
import CategoryPage from '../hsk/CategoryPage';

import {lightTheme} from '../styles/colors';
import {fonts} from '../styles/fonts';
import MatchingQuizPage from '../quiz/MatchingQuizPage';

export type QuizStackParamList = {
  QuizTypePage: undefined;
  PickLevelPage: undefined;
  CategoryPage: {level: number; forQuiz: boolean};
  MatchingQuizPage: {level: number; category: string};
};

const Stack = createNativeStackNavigator<QuizStackParamList>();

type QuizNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'QuizNavigation'
>;

function QuizNavigation({}: QuizNavigationProps): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: lightTheme.white,
        headerShadowVisible: false,
        headerTitleStyle: {fontFamily: fonts.mainBold},
        headerStyle: {backgroundColor: lightTheme.darkRed},
      }}>
      <Stack.Screen
        name="QuizTypePage"
        component={QuizTypePage}
        options={{
          headerTitle: '단어 암기 시험',
        }}
      />
      <Stack.Screen
        name="PickLevelPage"
        component={PickLevelPage}
        options={{
          headerTitle: '급수',
        }}
      />
      <Stack.Screen name="CategoryPage" component={CategoryPage} />
      <Stack.Screen name="MatchingQuizPage" component={MatchingQuizPage} />
    </Stack.Navigator>
  );
}

export default QuizNavigation;
