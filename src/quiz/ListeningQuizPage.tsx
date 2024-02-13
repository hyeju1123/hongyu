import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text} from 'react-native';

import {StackActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import PickingPanel from './PickingPanel';
import BottomNav, {PageType} from '../module/BottomNav';
import usePolly from '../hooks/polly';

import styles from '../styles/quiz/PickingQuizPageStyle';

type ListeningQuizPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'ListeningQuizPage'
>;

function ListeningQuizPage({
  navigation: {setOptions, dispatch},
  route: {
    params: {wordData},
  },
}: ListeningQuizPageProps): JSX.Element {
  const {QUIZ} = PageType;
  const [page, setPage] = useState(0);
  const {setToggle, clearMp3File} = usePolly();
  const totalLen = useRef(wordData.length).current;
  const corrected = useRef<number[]>([]).current;

  const moveToResult = useCallback(() => {
    dispatch(
      StackActions.replace('QuizResultPage', {
        words: wordData,
        corrected,
        quizType: 'ListeningQuizPage',
      }),
    );
  }, [dispatch, wordData, corrected]);

  const handleMove = useCallback(
    (newPage: number) => {
      newPage === totalLen ? moveToResult() : setPage(newPage);
    },
    [moveToResult, totalLen],
  );

  useEffect(() => {
    const {word, level} = wordData[page];
    setToggle({word, level});
    setOptions({headerTitle: page + 1 + '/' + totalLen});
    return () => {
      clearMp3File();
    };
  }, [page, totalLen, wordData, setOptions, setToggle, clearMp3File]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.guideText}>한자를 듣고 일치하는 뜻을 고르세요</Text>
        <PickingPanel
          index={page}
          listening={true}
          wordData={wordData}
          corrected={corrected}
        />
        <BottomNav
          id={wordData[page]._id}
          page={page}
          totalLen={totalLen}
          pageType={QUIZ}
          callback={handleMove}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ListeningQuizPage;
