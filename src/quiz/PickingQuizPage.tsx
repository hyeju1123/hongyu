import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackActions} from '@react-navigation/native';
import styles from '../styles/quiz/PickingQuizPageStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {QuizStackParamList} from '../navigation/QuizNavigation';

import BottomNav, {PageType} from '../module/BottomNav';
import PickingPanel from './PickingPanel';

type PickingQuizPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'PickingQuizPage'
>;

export type PickDataProps = {
  id: number;
  picked: string;
  correct: boolean;
};

function PickingQuizPage({
  navigation: {setOptions, dispatch},
  route: {
    params: {wordData},
  },
}: PickingQuizPageProps): JSX.Element {
  const {QUIZ} = PageType;
  const [page, setPage] = useState(0);
  const totalLen = useRef(wordData.length).current;
  const [pickData, setPickData] = useState<PickDataProps[]>(
    wordData.map(({_id}) => ({id: _id, picked: '', correct: false})),
  );

  const handlePick = useCallback(
    (picked: string, answer: string) => {
      if (pickData[page].picked !== '') {
        return;
      }

      const correct = answer === picked || false;
      setPickData(prev =>
        prev.map((v, i) => (i === page ? {...v, picked, correct} : v)),
      );
    },
    [page, pickData],
  );

  const moveToResult = useCallback(() => {
    const corrected = pickData.map(({id, correct}) => (correct ? id : false));
    dispatch(
      StackActions.replace('QuizResultPage', {
        words: wordData,
        corrected,
        quizType: 'PickingQuizPage',
      }),
    );
  }, [dispatch, pickData, wordData]);

  const handleMove = useCallback(
    (newPage: number) => {
      newPage === totalLen ? moveToResult() : setPage(newPage);
    },
    [moveToResult, totalLen],
  );

  useEffect(() => {
    setOptions({headerTitle: page + 1 + '/' + totalLen});
  }, [page, totalLen, setOptions]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.guideText}>한자에 맞는 뜻을 고르세요</Text>
        <PickingPanel
          index={page}
          totalLen={totalLen}
          wordData={wordData[page]}
          pickData={pickData[page]}
          handlePick={handlePick}
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

export default PickingQuizPage;
