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
import PickingQuizPage from '../quiz/PickingQuizPage';
import ListeningQuizPage from '../quiz/ListeningQuizPage';
import WritingQuizPage from '../quiz/WritingQuizPage';
import QuizResultPage, {ResultDataProps} from '../quiz/QuizResultPage';

import {useTheme} from '@react-navigation/native';
import {Word} from '../recoil/WordListState';

export type QuizServiceStackParamList = {
  QuizTypePage: undefined;
  PickLevelPage: {quizType: keyof QuizPageStackParamList};
  PickCategoryPage: {level: number; quizType: keyof QuizPageStackParamList};
  QuizResultPage: {
    resultData: ResultDataProps[];
    quizType: keyof QuizPageStackParamList;
  };
};

export type QuizPageStackParamList = {
  MatchingQuizPage: {wordData: Word[]};
  PickingQuizPage: {wordData: Word[]};
  ListeningQuizPage: {wordData: Word[]};
  WritingQuizPage: {wordData: Word[]};
};

export type QuizStackParamList = QuizServiceStackParamList &
  QuizPageStackParamList;

const Stack = createNativeStackNavigator<QuizStackParamList>();

type QuizNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'QuizNavigation'
>;

function QuizNavigation({}: QuizNavigationProps): JSX.Element {
  const {
    colors: {textPrimary, background},
  } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: textPrimary,
        headerStyle: {backgroundColor: background},
      }}>
      <Stack.Screen
        name="QuizTypePage"
        component={QuizTypePage}
        options={{
          headerTitle: '시험 유형',
        }}
      />
      <Stack.Screen
        name="PickLevelPage"
        component={PickLevelPage}
        options={{
          headerTitle: '급수 선택',
        }}
      />
      <Stack.Screen
        name="PickCategoryPage"
        component={PickCategoryPage}
        options={{
          headerTitle: '테마 선택',
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
        name="PickingQuizPage"
        component={PickingQuizPage}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="ListeningQuizPage"
        component={ListeningQuizPage}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="WritingQuizPage"
        component={WritingQuizPage}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="QuizResultPage"
        component={QuizResultPage}
        options={{
          headerTitle: '결과',
        }}
      />
    </Stack.Navigator>
  );
}

export default QuizNavigation;
