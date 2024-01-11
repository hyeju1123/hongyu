import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text, View, Image} from 'react-native';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import MatchingQuizGrid from '../module/MatchingQuizGrid';
import CircularTimer from '../module/CircularTimer';
import useUtil from '../hooks/util';
import {useVoca} from '../providers/VocaProvider';

import images from '../styles/images';
import styles from '../styles/MatchingQuizPageStyle';

type MatchingQuizPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'MatchingQuizPage'
>;

const TIMEOUT = 15000;
const PAGE_TRANSITION_DELAY = 2000;

function MatchingQuizPage({
  route,
  navigation,
}: MatchingQuizPageProps): JSX.Element {
  const {dumpling} = images.module;
  const {level, categories} = route.params;
  const {navigate} = navigation;

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
    handleTimeover();
    return () => {
      timeoutId.current !== null && clearTimeout(timeoutId.current);
    };
  }, [handleTimeover]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {notifyQuizEnd.state && (
        <View style={styles.endQuizWrapper}>
          <Image style={styles.dumplingIcon} source={dumpling} />
          <Text style={[styles.endQuizText, styles.largeText]}>
            {notifyQuizEnd.result}
          </Text>
          <Text style={[styles.endQuizText, styles.smallText]}>
            곧 다음 페이지로 이동합니다
          </Text>
        </View>
      )}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <CircularTimer currentPage={currentPage} />

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
