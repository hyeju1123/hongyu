import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/StackParamListType';
import {TouchableOpacity, ScrollView, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackActions} from '@react-navigation/native';

import {ResultDataProps} from './QuizResultPage';
import BackButton from './BackButton';
import SvgIcon from '../module/SvgIcon';
import Canvas, {SigningPathType} from '../module/Canvas';
import WritingPreviewInfo from './WritingPreviewInfo';
import CheckAnswerButton from './CheckAnswerButton';

import styles from '../styles/quiz/WritingQuizPageStyle';
import {useTheme} from '@react-navigation/native';

type WritingQuizPageProps = NativeStackScreenProps<
  RootStackParamList,
  'WritingQuizPage'
>;

type PageInfoType = {
  index: number;
  writings: SigningPathType[];
};

function WritingQuizPage({
  navigation,
  navigation: {setOptions, dispatch},
  route: {
    params: {wordData},
  },
}: WritingQuizPageProps): JSX.Element {
  const {
    colors: {textPrimary, deepShadow},
  } = useTheme();
  const writingRef = useRef<SigningPathType>([]);
  const totalLen = useRef(wordData.length).current;
  const [pageInfo, setPageInfo] = useState<PageInfoType>({
    index: 0,
    writings: [],
  });
  const [showWord, setShowWord] = useState(false);
  const [keepVisible, setKeepVisible] = useState(false);
  const [quizResult, setQuizResult] = useState<ResultDataProps[]>(
    wordData.map(word => ({...word, correct: false})),
  );

  const {index, writings} = pageInfo;

  const moveToResult = useCallback(() => {
    dispatch(
      StackActions.replace('QuizResultPage', {
        resultData: quizResult,
        quizType: 'WritingQuizPage',
      }),
    );
  }, [dispatch, quizResult]);

  const moveCallback = useCallback(
    (newIdx: number) => {
      if (newIdx === totalLen) {
        moveToResult();
      } else {
        const newWritings = writings.map((v, i) =>
          i === index ? writingRef.current : v,
        );

        setPageInfo({
          index: newIdx,
          writings: newWritings,
        });

        writingRef.current = writings[newIdx];
        !keepVisible && setShowWord(false);
      }
    },
    [index, writings, keepVisible, totalLen, moveToResult],
  );

  const handleCheckAnswer = useCallback(() => {
    setQuizResult(prev =>
      prev.map((v, i) => (i === index ? {...v, correct: !v.correct} : v)),
    );
  }, [index]);

  useEffect(() => {
    setPageInfo(prev => ({
      ...prev,
      writings: Array.from({length: wordData.length}, () => []),
    }));
  }, [wordData]);

  useEffect(() => {
    setOptions({headerTitle: index + 1 + '/' + totalLen});
  }, [index, totalLen, setOptions]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <BackButton navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.serviceButtonWrapper}>
          <CheckAnswerButton
            oButton
            index={index}
            quizResult={quizResult}
            handleCheckAnswer={handleCheckAnswer}
          />
          <CheckAnswerButton
            oButton={false}
            index={index}
            quizResult={quizResult}
            handleCheckAnswer={handleCheckAnswer}
          />
        </View>
        <View style={styles.infoContainer}>
          {showWord && (
            <View style={styles.serviceButtonWrapper}>
              <Text style={[styles.guideText, {color: textPrimary}]}>
                다음 페이지에서도 한자가 보이도록 유지
              </Text>
              <TouchableOpacity
                style={styles.svgWrapper}
                onPress={() => setKeepVisible(prev => !prev)}>
                <SvgIcon
                  fill={deepShadow}
                  name={keepVisible ? 'Checkbox' : 'Square'}
                  size={styles.checkBox.width}
                />
              </TouchableOpacity>
            </View>
          )}
          <WritingPreviewInfo
            index={index}
            totalLen={totalLen}
            data={wordData[index]}
            showWord={showWord}
            handleShowWord={() => setShowWord(prev => !prev)}
            moveCallback={moveCallback}
          />
        </View>
        <Canvas index={index} writings={writings} writingRef={writingRef} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default WritingQuizPage;
