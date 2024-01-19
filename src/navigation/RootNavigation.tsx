import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from '../main/MainPage';
import SearchPage from '../search/SearchPage';
import WordDetailPage from '../bookmark/WordDetailPage';
import EditWordPage from '../bookmark/EditWordPage';
import HskNavigation from './HskNavigation';
import BookmarkNavigation from './BookmarkNavigation';
import QuizNavigation from './QuizNavigation';
import BusuNavigation from './BusuNavigation';
import Busu from '../model/Busu';
import BusuDetailPage from '../busu/BusuDetailPage';
import WordNavigation from './WordNavigation';

export type RootStackParamList = {
  MainPage: undefined;
  SearchPage: undefined;
  WordDetailPage: {id: number};
  EditWordPage: {id: number};
  WordNavigation: undefined;
  HskNavigation: {level: number};
  BookmarkNavigation: undefined;
  QuizNavigation: undefined;
  BusuNavigation: undefined;
  BusuDetailPage: {busuData: Busu};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="SearchPage" component={SearchPage} />
        <Stack.Screen name="EditWordPage" component={EditWordPage} />
        <Stack.Screen name="WordDetailPage" component={WordDetailPage} />
        <Stack.Screen name="BusuDetailPage" component={BusuDetailPage} />

        <Stack.Screen name="WordNavigation" component={WordNavigation} />
        <Stack.Screen name="HskNavigation" component={HskNavigation} />
        <Stack.Screen
          name="BookmarkNavigation"
          component={BookmarkNavigation}
        />
        <Stack.Screen name="QuizNavigation" component={QuizNavigation} />
        <Stack.Screen name="BusuNavigation" component={BusuNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
