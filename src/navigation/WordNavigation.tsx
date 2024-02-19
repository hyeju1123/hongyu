import React from 'react';

import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootNavigation';

import CategoryBranchPage from '../word/categoryPages/CategoryBranchPage';
import WordPage from '../word/WordPage';
import VocaDetailPage from '../word/detailPages/VocaDetailPage';
import BusuDetailPage from '../word/detailPages/BusuDetailPage';
import EditVocaPage from '../word/EditVocaPage';

// Quiz Page
import MatchingQuizPage from '../quiz/MatchingQuizPage';
import PickingQuizPage from '../quiz/PickingQuizPage';
import ListeningQuizPage from '../quiz/ListeningQuizPage';
import WritingQuizPage from '../quiz/WritingQuizPage';
import QuizResultPage, {ResultDataProps} from '../quiz/QuizResultPage';

import {lightTheme} from '../styles/colors';
import {Word} from '../recoil/WordListState';

export type PureWordStackParamList = {
  CategoryBranchPage: undefined;
  WordPage: {category: string};
  VocaDetailPage: {id: number};
  BusuDetailPage: {id: number};
  EditVocaPage: {id: number};
};

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

export type WordStackParamList = PureWordStackParamList &
  QuizPageStackParamList &
  QuizServiceStackParamList;

const Stack = createNativeStackNavigator<WordStackParamList>();

type WordNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'WordNavigation'
>;

function WordNavigation({}: WordNavigationProps): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: lightTheme.textPrimary,
        headerStyle: {backgroundColor: lightTheme.background},
      }}>
      <Stack.Screen name="CategoryBranchPage" component={CategoryBranchPage} />
      <Stack.Screen name="WordPage" component={WordPage} />
      <Stack.Screen
        name="VocaDetailPage"
        component={VocaDetailPage}
        options={{headerTitle: '상세보기'}}
      />
      <Stack.Screen
        name="BusuDetailPage"
        component={BusuDetailPage}
        options={{headerTitle: '상세보기'}}
      />
      <Stack.Screen
        name="EditVocaPage"
        component={EditVocaPage}
        options={{headerTitle: '단어 수정'}}
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

export default WordNavigation;
