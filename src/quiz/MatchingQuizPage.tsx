import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/StackParamListType';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text, View} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {ResultDataProps} from './QuizResultPage';
import {Word} from '../recoil/WordListState';

import MatchingQuizGrid from '../module/MatchingQuizGrid';
import SvgIcon from '../module/SvgIcon';
import BackButton from './BackButton';
import Timer from '../module/Timer';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/quiz/MatchingQuizPageStyle';

type MatchingQuizPageProps = NativeStackScreenProps<
  RootStackParamList,
  'MatchingQuizPage'
>;

const TIMEOUT = 10000;
const PAGE_TRANSITION_DELAY = 1000;

function MatchingQuizPage({
  navigation,
  navigation: {setOptions, dispatch},
  route: {
    params: {wordData},
  },
}: MatchingQuizPageProps): JSX.Element {
  const {
    colors: {background, primary, textSecondary},
  } = useTheme();
  const [words, setWords] = useState<Word[]>([]);
  const quizResult = useRef<ResultDataProps[]>([]);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [notifyQuizEnd, setNotifyQuizEnd] = useState({
    state: false,
    result: 'TIMEOVER',
  });

  const pageLength = useMemo(() => Math.ceil(words.length / 5), [words.length]);
  const currentPageWords = words.slice(5 * (currentPage - 1), 5 * currentPage);

  const handleTimeover = useCallback(() => {
    const timeout = setTimeout(() => {
      if (currentPage === pageLength) {
        dispatch(
          StackActions.replace('QuizResultPage', {
            resultData: quizResult.current,
            quizType: 'MatchingQuizPage',
          }),
        );
      } else {
        setNotifyQuizEnd({state: true, result: 'TIMEOVER'});
        setTimeout(() => {
          setCurrentPage(prev => prev + 1);
          setNotifyQuizEnd(prev => ({...prev, state: false}));
        }, PAGE_TRANSITION_DELAY);
      }
    }, TIMEOUT);

    timeoutId.current = timeout;
  }, [currentPage, pageLength, dispatch, quizResult]);

  const handleAllClear = () => {
    timeoutId.current !== null && clearTimeout(timeoutId.current);
    setNotifyQuizEnd({state: true, result: 'ALL CLEAR!'});

    setTimeout(() => {
      if (currentPage === pageLength) {
        dispatch(
          StackActions.replace('QuizResultPage', {
            resultData: quizResult.current,
            quizType: 'MatchingQuizPage',
          }),
        );
      } else {
        setCurrentPage(prev => prev + 1);
        setNotifyQuizEnd(prev => ({...prev, state: false}));
      }
    }, PAGE_TRANSITION_DELAY);
  };

  useEffect(() => {
    setOptions({headerTitle: `${currentPage} / ${pageLength}`});
    handleTimeover();

    return () => {
      timeoutId.current !== null && clearTimeout(timeoutId.current);
    };
  }, [handleTimeover, setOptions, currentPage, pageLength]);

  useEffect(() => {
    setWords(wordData);
    quizResult.current = wordData.map(word => ({...word, correct: false}));
  }, [wordData]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <BackButton navigation={navigation} />
      {notifyQuizEnd.state && (
        <View style={[styles.endQuizContainer, {backgroundColor: background}]}>
          <View style={[styles.endQuizWrapper, {backgroundColor: primary}]}>
            <SvgIcon name="Man" size={styles.manIcon.width} />
            <Text
              style={[
                styles.largeText,
                styles.endQuizText,
                {color: textSecondary},
              ]}>
              {notifyQuizEnd.result}
            </Text>
            <Text
              style={[
                styles.smallText,
                styles.endQuizText,
                {color: textSecondary},
              ]}>
              곧 다음 페이지로 이동합니다
            </Text>
          </View>
        </View>
      )}
      <ScrollView
        style={styles.scrollView}
        bounces={false}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.timerWrapper}>
          <Timer duration={TIMEOUT} currentPage={currentPage} />
        </View>
        <MatchingQuizGrid
          handleAllClear={handleAllClear}
          quizResult={quizResult}
          words={currentPageWords}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MatchingQuizPage;
