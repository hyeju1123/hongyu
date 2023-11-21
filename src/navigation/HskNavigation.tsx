import React from 'react';

import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import CategoryPage from '../hsk/CategoryPage';
import {RootStackParamList} from './RootNavigation';
import WordPage from '../hsk/WordPage';
import WordDetailPage from '../bookmark/WordDetailPage';
import EditWordPage from '../bookmark/EditWordPage';

export type HskStackParamList = {
  CategoryPage: {level: number};
  WordPage: {level: number; category: string; fromBookmark?: boolean};
  WordDetailPage: {id: number};
  EditWordPage: {id: number};
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
      <Stack.Screen name="WordDetailPage" component={WordDetailPage} />
      <Stack.Screen name="EditWordPage" component={EditWordPage} />
    </Stack.Navigator>
  );
}

export default HskNavigation;
