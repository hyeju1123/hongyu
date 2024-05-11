import {ResultDataProps} from '../quiz/QuizResultPage';
import {Word} from '../recoil/WordListState';

export type RootStackParamList = MainStackParamList &
  SearchStackParamList &
  WordStackParamList &
  QuizStackParamList;

// Main Stack Type
export type MainStackParamList = {
  MainPage: undefined;
};

// Search Stack Type
export type SearchStackParamList = {
  SearchPage: undefined;
};

// Word Stack Type
export type WordStackParamList = {
  CategoryBranchPage: undefined;
  WordPage: {category: string};
  VocaDetailPage: {id: number};
  BusuDetailPage: {id: number};
  EditVocaPage: {id: number};
};

// Quiz Stack Type
export type QuizStackParamList = QuizServiceStackParamList &
  QuizPageStackParamList;

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
