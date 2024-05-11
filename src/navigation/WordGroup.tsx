import React from 'react';

import {Stack} from './RootNavigation';

import CategoryBranchPage from '../word/categoryPages/CategoryBranchPage';
import WordPage from '../word/WordPage';
import VocaDetailPage from '../word/detailPages/VocaDetailPage';
import BusuDetailPage from '../word/detailPages/BusuDetailPage';
import EditVocaPage from '../word/EditVocaPage';

function WordGroup() {
  return (
    <Stack.Group>
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
    </Stack.Group>
  );
}

export default WordGroup;
