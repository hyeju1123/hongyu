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
import {lightTheme} from '../styles/colors';

export type WordStackParamList = {
  CategoryBranchPage: undefined;
  WordPage: {category: string};
  VocaDetailPage: {id: number};
  BusuDetailPage: {id: number};
  EditVocaPage: {id: number};
};

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
        headerTintColor: lightTheme.black,
        headerStyle: {backgroundColor: lightTheme.white},
      }}>
      <Stack.Screen name="CategoryBranchPage" component={CategoryBranchPage} />
      <Stack.Screen
        name="WordPage"
        component={WordPage}
        options={({route: {params}}) => ({
          headerTitle: params.category,
        })}
      />
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
    </Stack.Navigator>
  );
}

export default WordNavigation;
