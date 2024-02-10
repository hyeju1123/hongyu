import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useQuiz, {Dir} from '../hooks/quiz';

import styles from '../styles/quiz/PickingQuizPageStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {QuizStackParamList} from '../navigation/QuizNavigation';

import BottomNav from '../module/BottomNav';
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
  navigation: {setOptions},
  route: {
    params: {wordData},
  },
}: PickingQuizPageProps): JSX.Element {
  const {handlePageMove} = useQuiz();
  const totalLen = useMemo(() => wordData.length, [wordData.length]);
  const [index, setIndex] = useState(0);
  const [pickData, setPickData] = useState<PickDataProps[]>(
    wordData.map(({_id}) => ({id: _id, picked: '', correct: false})),
  );

  const handleNav = useCallback(
    (dir: Dir) => {
      const moveCallback = (newIdx: number) => {
        setIndex(newIdx);
      };
      handlePageMove({dir, index, totalLen, moveCallback});
    },
    [handlePageMove, index, totalLen],
  );

  const handlePick = useCallback(
    (picked: string, answer: string) => {
      if (pickData[index].picked !== '') {
        return;
      }

      const correct = answer === picked || false;
      setPickData(prev =>
        prev.map((v, i) => (i === index ? {...v, picked, correct} : v)),
      );
    },
    [index, pickData],
  );

  useEffect(() => {
    setOptions({headerTitle: index + 1 + '/' + totalLen});
  }, [index, totalLen, setOptions]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.guideText}>한자에 맞는 뜻을 고르세요</Text>
        <PickingPanel
          index={index}
          totalLen={totalLen}
          wordData={wordData[index]}
          pickData={pickData[index]}
          handlePick={handlePick}
        />
        <BottomNav id={wordData[index]._id} handleNav={handleNav} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default PickingQuizPage;
