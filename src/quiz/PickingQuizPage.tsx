import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, ScrollView, BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackActions} from '@react-navigation/native';
import styles from '../styles/quiz/PickingQuizPageStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {ResultDataProps} from './QuizResultPage';
import useToast from '../hooks/toast';
import BottomNav, {PageType} from '../module/BottomNav';
import PickingPanel from './PickingPanel';
import {ToastIcon} from '../recoil/ToastState';
import {HeaderBackButton} from '@react-navigation/elements';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';

type PickingQuizPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'PickingQuizPage'
>;

function PickingQuizPage({
  navigation: {setOptions, dispatch, goBack},
  route: {
    params: {wordData},
  },
}: PickingQuizPageProps): JSX.Element {
  const {QUIZ} = PageType;
  const {fireToast} = useToast();
  const [page, setPage] = useState(0);
  const totalLen = useRef(wordData.length).current;
  const backEvent = useRef(0);
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.guideText}>한자에 맞는 뜻을 고르세요</Text>
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
