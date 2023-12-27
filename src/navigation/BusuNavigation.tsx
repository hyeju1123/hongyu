import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './RootNavigation';
import StrokeFolderPage from '../busu/StrokeFolderPage';
import BusuPage from '../busu/BusuPage';
import BusuDetailPage from '../busu/BusuDetailPage';
import Busu from '../model/Busu';

export type BusuStackParamList = {
  StrokeFolderPage: undefined;
  BusuPage: {stroke: number; fromBookmark?: boolean};
  BusuDetailPage: {busuData: Busu};
};

const Stack = createNativeStackNavigator<BusuStackParamList>();

type BusuNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'BusuNavigation'
>;

function BusuNavigation({}: BusuNavigationProps): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="StrokeFolderPage" component={StrokeFolderPage} />
      <Stack.Screen name="BusuPage" component={BusuPage} />
      <Stack.Screen name="BusuDetailPage" component={BusuDetailPage} />
    </Stack.Navigator>
  );
}

export default BusuNavigation;
