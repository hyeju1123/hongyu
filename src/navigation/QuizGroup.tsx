import React from 'react';

import {Stack} from './RootNavigation';

import QuizTypePage from '../quiz/QuizTypePage';
import PickLevelPage from '../quiz/PickLevelPage';
import PickCategoryPage from '../quiz/PickCategoryPage';
import MatchingQuizPage from '../quiz/MatchingQuizPage';
import PickingQuizPage from '../quiz/PickingQuizPage';
import ListeningQuizPage from '../quiz/ListeningQuizPage';
import WritingQuizPage from '../quiz/WritingQuizPage';
import QuizResultPage from '../quiz/QuizResultPage';

function QuizGroup() {
  return (
    <Stack.Group>
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
    </Stack.Group>
  );
}

export default QuizGroup;
