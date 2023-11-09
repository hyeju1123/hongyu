import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './Header';
import VocaSection from './VocaSection';
import styles from '../styles/MainPageStyle';
import ServiceSection from './ServiceSection';

function MainPage(): JSX.Element {
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
        <VocaSection />
        <ServiceSection />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MainPage;
