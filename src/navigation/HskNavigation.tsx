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
import {lightTheme} from '../styles/colors';
import {fonts} from '../styles/fonts';

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
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: lightTheme.white,
        headerShadowVisible: false,
        headerTitleStyle: {fontFamily: fonts.mainBold},
        headerStyle: {backgroundColor: lightTheme.red},
      }}>
      <Stack.Screen
        name="CategoryPage"
        component={CategoryPage}
        initialParams={{level}}
        options={({route: {params}}) => ({
          title: `HSK ${params.level}급`,
        })}
      />
      <Stack.Screen
        name="WordPage"
        component={WordPage}
        options={({route: {params}}) => ({
          title: params.category,
        })}
      />
      <Stack.Screen
        options={{headerTitle: '상세보기'}}
        name="WordDetailPage"
        component={WordDetailPage}
      />
      <Stack.Screen
        options={{headerTitle: '단어 수정'}}
        name="EditWordPage"
        component={EditWordPage}
      />
    </Stack.Navigator>
  );
}

export default HskNavigation;
