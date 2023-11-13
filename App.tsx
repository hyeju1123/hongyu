import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from './src/main/MainPage';
import HskNavigation from './src/navigation/HskNavigation';
import {RealmProvider} from './src/context/RealmConfigContext';

export type RootStackParamList = {
  MainPage: undefined;
  HskNavigation: {level: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <RealmProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="HskNavigation" component={HskNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
}

export default App;
