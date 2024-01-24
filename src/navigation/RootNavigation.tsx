import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from '../main/MainPage';
import SearchNavigation from './SearchNavigation';
import WordNavigation from './WordNavigation';
import QuizNavigation from './QuizNavigation';

export type RootStackParamList = {
  MainPage: undefined;
  SearchNavigation: undefined;
  WordNavigation: undefined;
  QuizNavigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="SearchNavigation" component={SearchNavigation} />
        <Stack.Screen name="WordNavigation" component={WordNavigation} />
        <Stack.Screen name="QuizNavigation" component={QuizNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
