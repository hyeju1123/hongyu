import React, {useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ScrollView, View, Text} from 'react-native';
import Canvas, {SigningPathType} from '../module/Canvas';
import WritingPreviewInfo from './WritingPreviewInfo';
import Voca from '../model/Voca';
import useUtil from '../hooks/util';
import useToast from '../hooks/toast';
import {ToastIcon} from '../recoil/ToastState';
import {useVoca} from '../providers/VocaProvider';

import styles from '../styles/quiz/WritingQuizPageStyle';
import SvgIcon from '../module/SvgIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {lightTheme} from '../styles/colors';

export enum Dir {
  FORWARD = 'forward',
  BACKWARD = 'backward',
}

type WritingQuizPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'WritingQuizPage'
>;

function WritingQuizPage({
  navigation: {setOptions},
  route: {
    params: {level, categories},
  },
}: WritingQuizPageProps) {
  const {fireToast} = useToast();
  const {shuffleArray} = useUtil();
  const {getVocasByMultipleCategory} = useVoca();

  const writingRef = useRef<SigningPathType>([]);
  const [index, setIndex] = useState(0);
  const [words, setWords] = useState<Voca[]>([]);
  const [showWord, setShowWord] = useState(false);
  const [keepVisible, setKeepVisible] = useState(false);
  const [scoreCard, setScoreCard] = useState<boolean[]>();
  const [writings, setWritings] = useState<SigningPathType[]>([]);
  const totalLen = useMemo(() => words.length, [words.length]);

  const handlePageMove = (dir: Dir) => {
    const isLastPage = index === totalLen - 1;
    const isFirstPage = index === 0;

    const showToast = (message: string) => {
      fireToast({
        text: message,
        icon: ToastIcon.AbNormal,
        remove: true,
      });
    };

    if (dir === Dir.FORWARD) {
      if (isLastPage) {
        showToast('마지막 페이지입니다');
      } else {
        setIndex(prev => prev + 1);

        const newWritings = writings.map((v, i) =>
          i === index ? writingRef.current : v,
        );
        setWritings(newWritings);

        writingRef.current = writings[index + 1];
      }
    }

    if (dir === Dir.BACKWARD) {
      if (isFirstPage) {
        showToast('첫번째 페이지입니다');
      } else {
        setIndex(prev => prev - 1);

        const newWritings = writings.map((v, i) =>
          i === index ? writingRef.current : v,
        );
        setWritings(newWritings);
        writingRef.current = writings[index - 1];
      }
    }

    !keepVisible && setShowWord(false);
  };

  useEffect(() => {
    const data = shuffleArray(getVocasByMultipleCategory(level, categories));
    setWords(data);
    setScoreCard(Array.from({length: data.length}, () => false));
    setWritings(Array.from({length: data.length}, () => []));
  }, [shuffleArray, getVocasByMultipleCategory, level, categories]);

  useEffect(() => {
    setOptions({headerTitle: index + 1 + '/' + totalLen});
  }, [index, totalLen, setOptions]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.infoContainer}>
          <View style={styles.serviceButtonWrapper}>
            <TouchableOpacity
              style={styles.serviceButtonWrapper}
              onPress={() =>
                setScoreCard(prev =>
                  prev?.map((v, i) => (i === index ? !v : v)),
                )
              }>
              <SvgIcon name={'Circle'} fill={lightTheme.green} size={20} />
              {scoreCard?.[index] ? (
                <SvgIcon name={'Checkbox'} fill={lightTheme.gray} size={14} />
              ) : (
                <SvgIcon name={'Square'} fill={lightTheme.gray} size={14} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.serviceButtonWrapper}
              onPress={() =>
                setScoreCard(prev =>
                  prev?.map((v, i) => (i === index ? !v : v)),
                )
              }>
              <SvgIcon name={'Cross'} fill={lightTheme.warning} size={20} />
              {scoreCard?.[index] ? (
                <SvgIcon name={'Square'} fill={lightTheme.gray} size={14} />
              ) : (
                <SvgIcon name={'Checkbox'} fill={lightTheme.gray} size={14} />
              )}
            </TouchableOpacity>
          </View>
          {showWord && (
            <View style={styles.serviceButtonWrapper}>
              <Text style={styles.guideText}>
                다음 페이지에서도 한자가 보이도록 유지
              </Text>
              {keepVisible ? (
                <TouchableOpacity
                  style={styles.svgWrapper}
                  onPress={() => setKeepVisible(false)}>
                  <SvgIcon name={'Checkbox'} fill={lightTheme.gray} size={14} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.svgWrapper}
                  onPress={() => setKeepVisible(true)}>
                  <SvgIcon name={'Square'} fill={lightTheme.gray} size={14} />
                </TouchableOpacity>
              )}
            </View>
          )}
          {words.length > 0 && (
            <WritingPreviewInfo
              data={words[index]}
              showWord={showWord}
              handleShowWord={() => setShowWord(prev => !prev)}
              handlePageMove={handlePageMove}
            />
          )}
        </View>
        <Canvas index={index} writings={writings} writingRef={writingRef} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default WritingQuizPage;
