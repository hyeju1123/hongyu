import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text} from 'react-native';

import {StackActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {PickDataProps} from './PickingQuizPage';
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
  const {setToggle, clearMp3File} = usePolly();
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
        quizType: 'ListeningQuizPage',
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
          totalLen={totalLen}
          wordData={wordData[page]}
          pickData={pickData[page]}
          listening={true}
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

export default ListeningQuizPage;
