import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text, View, BackHandler} from 'react-native';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {HeaderBackButton} from '@react-navigation/elements';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import MatchingQuizGrid from '../module/MatchingQuizGrid';
import Timer from '../module/Timer';
import SvgIcon from '../module/SvgIcon';

import useUtil from '../hooks/util';
import useToast from '../hooks/toast';
import {useVoca} from '../providers/VocaProvider';

import styles from '../styles/quiz/MatchingQuizPageStyle';
import {ToastIcon} from '../recoil/ToastState';

type MatchingQuizPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'MatchingQuizPage'
>;

const TIMEOUT = 10000;
const PAGE_TRANSITION_DELAY = 1000;

function MatchingQuizPage({
  navigation: {navigate, goBack, setOptions},
  route: {
    params: {level, categories},
  },
}: MatchingQuizPageProps): JSX.Element {
  const {fireToast} = useToast();
  const {shuffleArray} = useUtil();

  const correctedIds: number[] = useMemo(() => [], []);
  const {getVocasByMultipleCategory} = useVoca();

  const [words] = useState(
    shuffleArray(getVocasByMultipleCategory(level, categories)),
  );
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [notifyQuizEnd, setNotifyQuizEnd] = useState({
    state: false,
    result: '',
  });
  const backEvent = useRef(0);
  const pageLength = useRef(Math.ceil(words.length / 5)).current;
  const currentPageWords = words.slice(5 * (currentPage - 1), 5 * currentPage);

  const handleTimeover = useCallback(() => {
    const timeout = setTimeout(() => {
      if (currentPage === pageLength) {
        navigate('QuizResultPage', {
          words: words,
          corrected: correctedIds,
        });
      } else {
        setNotifyQuizEnd({state: true, result: 'TIMEOVER'});
        setTimeout(() => {
          setCurrentPage(prev => prev + 1);
          setNotifyQuizEnd(prev => ({...prev, state: false}));
        }, PAGE_TRANSITION_DELAY);
      }
    }, TIMEOUT);

    timeoutId.current = timeout;
  }, [currentPage, pageLength, words, navigate, correctedIds]);

  const handleAllClear = () => {
    timeoutId.current !== null && clearTimeout(timeoutId.current);
    setNotifyQuizEnd({state: true, result: 'ALL CLEAR!'});

    setTimeout(() => {
      if (currentPage === pageLength) {
        navigate('QuizResultPage', {
          words: words,
          corrected: correctedIds,
        });
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

    setOptions({
      headerLeft: handleBackButton,
    });

    return () => handleHardwareBack.remove();
  }, [fireToast, setOptions, goBack]);

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
