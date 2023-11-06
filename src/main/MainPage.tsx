import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './Header';
import {lightTheme} from '../styles/colors';

function MainPage(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView style={styles.scrollView}>
        <Header />
        <Text>MainPage</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.white,
  },
  scrollView: {
    borderWidth: 1,
    borderColor: 'cyan',
    marginHorizontal: 20,
  },
});

export default MainPage;
