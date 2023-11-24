import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StatusBar} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigation';
import Header from './Header';
import VocaSection from './VocaSection';
import ServiceSection from './ServiceSection';
import styles from '../styles/MainPageStyle';

type MainPageProps = NativeStackScreenProps<RootStackParamList, 'MainPage'>;

function MainPage({navigation}: MainPageProps): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}>
        <Header />
        <VocaSection navigation={navigation} />
        <ServiceSection />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MainPage;
