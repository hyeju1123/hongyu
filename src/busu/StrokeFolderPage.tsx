import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {BusuStackParamList} from '../navigation/BusuNavigation';

import {useVoca} from '../providers/VocaProvider';

import styles from '../styles/StrokeFolderPageStyle';
import CategoryCardWrapper from '../module/CategoryCardWrapper';
import {lightTheme} from '../styles/colors';

type StrokeFolderPageProps = NativeStackScreenProps<
  BusuStackParamList,
  'StrokeFolderPage'
>;

function StrokeFolderPage({navigation}: StrokeFolderPageProps): JSX.Element {
  const {navigate} = navigation;
  const {countBusuByStroke} = useVoca();
  const infos = Object.entries(countBusuByStroke()).map(([key, value]) => {
    const stroke = Number(key) + 1;
    return {
      title: `${stroke}획 ${stroke === 10 ? '이상' : ''}`,
      desc: `부수 ${value}개`,
      icon: `Circle${stroke}`,
      navData: `${stroke}`,
    };
  });

  const moveToBusuPage = (stroke: string) => {
    navigate('BusuPage', {stroke: Number(stroke)});
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <CategoryCardWrapper
        nav={moveToBusuPage}
        infos={infos}
        theme={lightTheme.darkRed}
      />
    </SafeAreaView>
  );
}

export default StrokeFolderPage;
