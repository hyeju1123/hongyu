import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RealmProvider} from '../context/RealmConfigContext';
import MainPage from '../main/MainPage';
import HskNavigation from './HskNavigation';
import BookmarkNavigation from './BookmarkNavigation';

export type RootStackParamList = {
  MainPage: undefined;
  HskNavigation: {level: number};
  BookmarkNavigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation(): JSX.Element {
  return (
    <RealmProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="HskNavigation" component={HskNavigation} />
          <Stack.Screen
            name="BookmarkNavigation"
            component={BookmarkNavigation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
}

export default RootNavigation;
