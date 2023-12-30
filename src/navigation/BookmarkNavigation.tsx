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
import {lightTheme} from '../styles/colors';
import {fonts} from '../styles/fonts';

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
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: lightTheme.white,
        headerShadowVisible: false,
        headerTitleStyle: {fontFamily: fonts.mainBold},
        headerStyle: {backgroundColor: lightTheme.red},
      }}>
      <Stack.Screen
        options={{headerTitle: '내 단어장 '}}
        name="DirectoryPage"
        component={DirectoryPage}
      />
      <Stack.Screen name="WordPage" component={WordPage} />
      <Stack.Screen
        options={{headerTitle: '상세보기'}}
        name="WordDetailPage"
        component={WordDetailPage}
      />
      <Stack.Screen
        options={{headerStyle: {backgroundColor: lightTheme.darkRed}}}
        name="BusuPage"
        component={BusuPage}
      />
      <Stack.Screen
        options={{headerTitle: '단어 수정'}}
        name="EditWordPage"
        component={EditWordPage}
      />
    </Stack.Navigator>
  );
}

export default BookmarkNavigation;
