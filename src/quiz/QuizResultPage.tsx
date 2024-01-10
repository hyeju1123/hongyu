import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {QuizStackParamList} from '../navigation/QuizNavigation';

type QuizResultPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'QuizResultPage'
>;

function QuizResultPage({navigation, route}: QuizResultPageProps) {
  const {words, corrected} = route.params;

  return (
    <View>
      {words.map(({word, _id}, index) => (
        <Text key={index}>
          {word} / {corrected.includes(_id) ? '맞음' : '틀림'}
        </Text>
      ))}
    </View>
  );
}

export default QuizResultPage;
