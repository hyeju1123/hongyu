import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StatusBar, Text, TouchableOpacity} from 'react-native';
import {BusuStackParamList} from '../navigation/BusuNavigation';

import Card from '../module/Card';
import {useVoca} from '../providers/VocaProvider';

import styles from '../styles/StrokeFolderPageStyle';

type StrokeFolderPageProps = NativeStackScreenProps<
  BusuStackParamList,
  'StrokeFolderPage'
>;

function StrokeFolderPage({navigation}: StrokeFolderPageProps): JSX.Element {
  const {navigate} = navigation;
  const {countBusuByStroke} = useVoca();
  const strokeInfo = countBusuByStroke();

  const showData = (data: Object) => {
    return Object.entries(data).map(([key, value]) => {
      const stroke = Number(key) + 1;
      return (
        <TouchableOpacity
          key={stroke}
          onPress={() => navigate('BusuPage', {stroke})}>
          <Card marginVertical={10} theme="white">
            <Text style={styles.text}>
              {stroke}획 {stroke === 10 && '이상'}
            </Text>
            <Text style={styles.bottomText}>
              부수 {<Text style={styles.bottomRedText}>{value}</Text>}개
            </Text>
          </Card>
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView style={styles.scrollView}>{showData(strokeInfo)}</ScrollView>
    </SafeAreaView>
  );
}

export default StrokeFolderPage;
