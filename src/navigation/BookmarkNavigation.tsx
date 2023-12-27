import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './RootNavigation';
import DirectoryPage from '../bookmark/DirectoryPage';
import WordPage from '../hsk/WordPage';
import WordDetailPage from '../bookmark/WordDetailPage';
import EditWordPage from '../bookmark/EditWordPage';
import BusuPage from '../busu/BusuPage';
import Busu from '../model/Busu';

export type BookmarkStackParamList = {
  DirectoryPage: undefined;
  WordPage: {level: number; category: string; fromBookmark?: boolean};
  WordDetailPage: {id: number};
  BusuPage: {stroke: number; fromBookmark?: boolean};
  BusuDetailPage: {busuData: Busu};
  EditWordPage: {id: number};
};

const Stack = createNativeStackNavigator<BookmarkStackParamList>();

type BookmarkNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'BookmarkNavigation'
>;

function BookmarkNavigation({}: BookmarkNavigationProps): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DirectoryPage" component={DirectoryPage} />
      <Stack.Screen name="WordPage" component={WordPage} />
      <Stack.Screen name="WordDetailPage" component={WordDetailPage} />
      <Stack.Screen name="BusuPage" component={BusuPage} />
      <Stack.Screen name="EditWordPage" component={EditWordPage} />
    </Stack.Navigator>
  );
}

export default BookmarkNavigation;
