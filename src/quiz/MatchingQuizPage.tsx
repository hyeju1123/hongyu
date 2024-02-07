import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text, View, BackHandler} from 'react-native';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {HeaderBackButton} from '@react-navigation/elements';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {StackActions} from '@react-navigation/native';
import MatchingQuizGrid from '../module/MatchingQuizGrid';
import Timer from '../module/Timer';
import SvgIcon from '../module/SvgIcon';

import useToast from '../hooks/toast';

import styles from '../styles/quiz/MatchingQuizPageStyle';
import {ToastIcon} from '../recoil/ToastState';
import {Word} from '../recoil/WordListState';

type MatchingQuizPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'MatchingQuizPage'
>;

const TIMEOUT = 10000;
const PAGE_TRANSITION_DELAY = 1000;

function MatchingQuizPage({
  navigation: {goBack, setOptions, dispatch},
  route: {
    params: {wordData},
  },
}: MatchingQuizPageProps): JSX.Element {
  const {fireToast} = useToast();

  const correctedIds: number[] = useMemo(() => [], []);
  const [words, setWords] = useState<Word[]>([]);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [notifyQuizEnd, setNotifyQuizEnd] = useState({
    state: false,
    result: '',
  });
  const backEvent = useRef(0);
  const pageLength = useMemo(() => Math.ceil(words.length / 5), [words.length]);
  const currentPageWords = words.slice(5 * (currentPage - 1), 5 * currentPage);

  console.log('render');

  const handleTimeover = useCallback(() => {
    const timeout = setTimeout(() => {
      if (currentPage === pageLength) {
        dispatch(
          StackActions.replace('QuizResultPage', {
            words,
            corrected: correctedIds,
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
  }, [currentPage, pageLength, words, dispatch, correctedIds]);

  const handleAllClear = () => {
    timeoutId.current !== null && clearTimeout(timeoutId.current);
    setNotifyQuizEnd({state: true, result: 'ALL CLEAR!'});

    setTimeout(() => {
      if (currentPage === pageLength) {
        dispatch(
          StackActions.replace('QuizResultPage', {
            words,
            corrected: correctedIds,
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
    const backAction = () => {
      setTimeout(() => {
        backEvent.current = 0;
      }, 2000);
      if (backEvent.current === 0) {
        backEvent.current += 1;
        fireToast({
          text: "'뒤로가기'를 한 번 더 누르면 시험이 종료됩니다",
          icon: ToastIcon.AbNormal,
          remove: true,
        });
      } else {
        goBack();
      }
      return true;
    };

    const handleBackButton = (props: HeaderBackButtonProps) => (
      <HeaderBackButton {...props} onPress={backAction} />
    );

    const handleHardwareBack = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    setWords(wordData);
    setOptions({
      headerLeft: handleBackButton,
    });

    return () => handleHardwareBack.remove();
  }, [fireToast, setOptions, goBack, wordData]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {notifyQuizEnd.state && (
        <View style={styles.endQuizContainer}>
          <View style={styles.endQuizWrapper}>
            <SvgIcon name="Man" size={80} />
            <Text style={[styles.endQuizText, styles.largeText]}>
              {notifyQuizEnd.result}
            </Text>
            <Text style={[styles.endQuizText, styles.smallText]}>
              곧 다음 페이지로 이동합니다
            </Text>
          </View>
        </View>
      )}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.timerWrapper}>
          <Timer duration={TIMEOUT} currentPage={currentPage} />
        </View>
        <MatchingQuizGrid
          handleAllClear={handleAllClear}
          correctedIds={correctedIds}
          words={currentPageWords}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MatchingQuizPage;
