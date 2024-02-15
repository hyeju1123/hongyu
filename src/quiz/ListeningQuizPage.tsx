import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {StackActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text} from 'react-native';
import {ResultDataProps} from './QuizResultPage';
import usePolly from '../hooks/polly';
import BackButton from './BackButton';
import PickingPanel from './PickingPanel';
import BottomNav, {PageType} from '../module/BottomNav';

import styles from '../styles/quiz/PickingQuizPageStyle';

type ListeningQuizPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'ListeningQuizPage'
>;

function ListeningQuizPage({
  navigation,
  navigation: {setOptions, dispatch},
  route: {
    params: {wordData},
  },
}: ListeningQuizPageProps): JSX.Element {
  const {QUIZ} = PageType;
  const [page, setPage] = useState(0);
  const {setToggle, clearMp3File} = usePolly();
  const totalLen = useRef(wordData.length).current;
  const quizResult = useRef<ResultDataProps[]>(
    wordData.map(word => ({...word, correct: false})),
  );

  const moveToResult = useCallback(() => {
    dispatch(
      StackActions.replace('QuizResultPage', {
        resultData: quizResult.current,
        quizType: 'ListeningQuizPage',
      }),
    );
  }, [dispatch, quizResult]);

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
  }, [page, totalLen, wordData, setOptions, setToggle]);

  useEffect(() => {
    return () => {
      clearMp3File();
    };
  }, [clearMp3File]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <BackButton navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.guideText}>한자를 듣고 일치하는 뜻을 고르세요</Text>
        <PickingPanel index={page} listening={true} quizResult={quizResult} />
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
