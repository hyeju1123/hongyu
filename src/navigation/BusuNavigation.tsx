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
import {lightTheme} from '../styles/colors';
import {fonts} from '../styles/fonts';

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
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: lightTheme.white,
        headerShadowVisible: false,
        headerTitleStyle: {fontFamily: fonts.mainBold},
        headerStyle: {backgroundColor: lightTheme.darkRed},
      }}>
      <Stack.Screen
        options={{
          headerTitle: '부수 사전',
        }}
        name="StrokeFolderPage"
        component={StrokeFolderPage}
      />
      <Stack.Screen name="BusuPage" component={BusuPage} />
      <Stack.Screen
        options={{
          headerTitle: '상세보기',
        }}
        name="BusuDetailPage"
        component={BusuDetailPage}
      />
    </Stack.Navigator>
  );
}

export default BusuNavigation;
