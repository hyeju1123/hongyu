import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from '../main/MainPage';
import SearchGroup from './SearchGroup';
import WordGroup from './WordGroup';
import QuizGroup from './QuizGroup';

import {useRecoilValue} from 'recoil';
import {themeState} from '../recoil/ThemeState';
import {darkTheme, lightTheme} from '../styles/colors';
import {RootStackParamList} from './StackParamListType';

export const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation(): JSX.Element {
  const theme = useRecoilValue(themeState);
  const themeColors = theme === 'dark' ? darkTheme : lightTheme;
  const {
    colors: {textPrimary, background},
  } = themeColors;

  return (
    <NavigationContainer theme={themeColors}>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: background},
          headerBackTitleVisible: false,
          headerTintColor: textPrimary,
          headerShadowVisible: false,
          headerTitle: '',
        }}>
        <Stack.Screen
          options={{headerShown: false}}
          name="MainPage"
          component={MainPage}
        />
        {SearchGroup()}
        {WordGroup()}
        {QuizGroup()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
