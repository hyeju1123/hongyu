import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {ResultDataProps} from './QuizResultPage';

import BottomNav, {PageType} from '../module/BottomNav';
import PickingPanel from './PickingPanel';
import BackButton from './BackButton';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/quiz/PickingQuizPageStyle';

type PickingQuizPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'PickingQuizPage'
>;

function PickingQuizPage({
  navigation,
  navigation: {setOptions, dispatch},
  route: {
    params: {wordData},
  },
}: PickingQuizPageProps): JSX.Element {
  const {
    colors: {deepShadow},
  } = useTheme();
  const {QUIZ} = PageType;
  const [page, setPage] = useState(0);
  const totalLen = useRef(wordData.length).current;
  const quizResult = useRef<ResultDataProps[]>(
    wordData.map(word => ({...word, correct: false})),
  );

  const moveToResult = useCallback(() => {
    dispatch(
      StackActions.replace('QuizResultPage', {
        resultData: quizResult.current,
        quizType: 'PickingQuizPage',
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
    setOptions({headerTitle: page + 1 + '/' + totalLen});
  }, [page, totalLen, setOptions]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <BackButton navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[styles.guideText, {color: deepShadow}]}>
          한자에 맞는 뜻을 고르세요
        </Text>
        <PickingPanel index={page} quizResult={quizResult} />
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
