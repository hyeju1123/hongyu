import React from 'react';

import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootNavigation';
import QuizTypePage from '../quiz/QuizTypePage';
import PickLevelPage from '../quiz/PickLevelPage';
import PickCategoryPage from '../quiz/PickCategoryPage';
import MatchingQuizPage from '../quiz/MatchingQuizPage';

import {lightTheme} from '../styles/colors';
import {fonts} from '../styles/fonts';
import QuizResultPage from '../quiz/QuizResultPage';
import Voca from '../model/Voca';

export type QuizStackParamList = {
  QuizTypePage: undefined;
  PickLevelPage: undefined;
  PickCategoryPage: {level: number};
  MatchingQuizPage: {level: number; categories: string[]};
  QuizResultPage: {words: Voca[]; corrected: number[]};
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
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="PickCategoryPage"
        component={PickCategoryPage}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="MatchingQuizPage"
        component={MatchingQuizPage}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="QuizResultPage"
        component={QuizResultPage}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}

export default QuizNavigation;
