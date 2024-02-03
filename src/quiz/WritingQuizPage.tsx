import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Canvas from '../module/Canvas';
import styles from '../styles/quiz/WritingQuizPageStyle';
import {ScrollView, View, Text} from 'react-native';

function WritingQuizPage() {
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.infoWrapper}>
          <Text>주어진 뜻에 맞는 한자를 써보세요</Text>
        </View>
        <Canvas />
      </ScrollView>
    </SafeAreaView>
  );
}

export default WritingQuizPage;
