import React from 'react';

import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootNavigation';
import SearchPage from '../search/SearchPage';

import {lightTheme} from '../styles/colors';
import VocaDetailPage from '../word/detailPages/VocaDetailPage';
import BusuDetailPage from '../word/detailPages/BusuDetailPage';
import EditVocaPage from '../word/EditVocaPage';

export type SearchStackParamList = {
  SearchPage: undefined;
  VocaDetailPage: {id: number};
  BusuDetailPage: {id: number};
  EditVocaPage: {id: number};
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

type SearchNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchNavigation'
>;

function SearchNavigation({}: SearchNavigationProps): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: lightTheme.black,
      }}>
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{headerShown: false}}
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

export default SearchNavigation;
