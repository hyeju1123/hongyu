import React from 'react';

import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import CategoryPage from '../hsk/CategoryPage';
import {RootStackParamList} from '../../App';
import WordPage from '../hsk/WordPage';

export type HskStackParamList = {
  CategoryPage: {level: number};
  WordPage: {level: number; category: string};
};

const Stack = createNativeStackNavigator<HskStackParamList>();

type HskNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'HskNavigation'
>;

function HskNavigation({route}: HskNavigationProps): JSX.Element {
  const {level} = route.params;

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="CategoryPage"
        component={CategoryPage}
        initialParams={{level}}
      />
      <Stack.Screen name="WordPage" component={WordPage} />
    </Stack.Navigator>
  );
}

export default HskNavigation;
