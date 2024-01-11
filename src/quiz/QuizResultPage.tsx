import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import styles from '../styles/quiz/QuizResultPageStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../module/Card';
import SvgIcon from '../module/SvgIcon';
import {lightTheme} from '../styles/colors';
import images from '../styles/images';

type QuizResultPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'QuizResultPage'
>;

function QuizResultPage({navigation, route}: QuizResultPageProps) {
  const {words, corrected} = route.params;
  const {green, red} = lightTheme;
  const {lanternOff} = images.module;

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={styles.flatlistContent}
        data={words}
        renderItem={({item: {word, intonation, meaning, _id}}) => {
          const isCorrected = corrected.includes(_id);
          return (
            <Card key={_id}>
              <View style={styles.dirRow}>
                <SvgIcon
                  size={20}
                  name={isCorrected ? 'CheckCircle' : 'Cross'}
                  fill={isCorrected ? green : red}
                />
                <Image style={styles.lantern} source={lanternOff} />
              </View>
              <Text style={styles.hanzi}>{word}</Text>
              <Text style={styles.meaningText}>{intonation}</Text>
              <Text style={styles.meaningText}>{meaning}</Text>
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
}

export default QuizResultPage;
