import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ScrollView, View, Text} from 'react-native';
import Canvas, {SigningPathType} from '../module/Canvas';
import WritingPreviewInfo from './WritingPreviewInfo';

import * as Icons from '../styles/svgIndex';
import styles from '../styles/quiz/WritingQuizPageStyle';
import SvgIcon from '../module/SvgIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {lightTheme} from '../styles/colors';
import {StackActions} from '@react-navigation/native';

type WritingQuizPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'WritingQuizPage'
>;

type PageInfoType = {
  index: number;
  writings: SigningPathType[];
};

type ScoreButtonType = {
  index: number;
  oButton: boolean;
  scoreCard: boolean[] | undefined;
  setScoreCard: React.Dispatch<React.SetStateAction<boolean[] | undefined>>;
};

const ScoreButton = ({
  index,
  oButton,
  scoreCard,
  setScoreCard,
}: ScoreButtonType): JSX.Element => {
  const {green, warning, gray} = lightTheme;
  const icon = (oButton ? 'Circle' : 'Cross') as keyof typeof Icons;
  const iconColor = oButton ? green : warning;
  const correctCheck = oButton && scoreCard?.[index] ? 'Checkbox' : 'Square';
  const wrongCheck = !oButton && scoreCard?.[index] ? 'Square' : 'Checkbox';
  const checkbox = (oButton ? correctCheck : wrongCheck) as keyof typeof Icons;

  return (
    <TouchableOpacity
      style={styles.serviceButtonWrapper}
      onPress={() =>
        setScoreCard(prev => prev?.map((v, i) => (i === index ? !v : v)))
      }>
      <SvgIcon name={icon} fill={iconColor} size={20} />
      <SvgIcon name={checkbox} fill={gray} size={14} />
    </TouchableOpacity>
  );
};

function WritingQuizPage({
  navigation: {setOptions, dispatch},
  route: {
    params: {wordData},
  },
}: WritingQuizPageProps): JSX.Element {
  const writingRef = useRef<SigningPathType>([]);
  const totalLen = useRef(wordData.length).current;
  const [pageInfo, setPageInfo] = useState<PageInfoType>({
    index: 0,
    writings: [],
  });
  const [showWord, setShowWord] = useState(false);
  const [keepVisible, setKeepVisible] = useState(false);
  const [scoreCard, setScoreCard] = useState<boolean[]>();

  const {index, writings} = pageInfo;

  const moveToResult = useCallback(() => {
    const corrected =
      scoreCard
        ?.map((v, i) => (v ? wordData?.[i]._id : -1))
        .filter(v => v !== -1) || [];

    dispatch(
      StackActions.replace('QuizResultPage', {
        words: wordData,
        corrected,
        quizType: 'WritingQuizPage',
      }),
    );
  }, [dispatch, scoreCard, wordData]);

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

  useEffect(() => {
    setScoreCard(Array.from({length: wordData.length}, () => false));
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.infoContainer}>
          <View style={styles.serviceButtonWrapper}>
            <ScoreButton
              oButton
              index={index}
              scoreCard={scoreCard}
              setScoreCard={setScoreCard}
            />
            <ScoreButton
              oButton={false}
              index={index}
              scoreCard={scoreCard}
              setScoreCard={setScoreCard}
            />
          </View>
          {showWord && (
            <View style={styles.serviceButtonWrapper}>
              <Text style={styles.guideText}>
                다음 페이지에서도 한자가 보이도록 유지
              </Text>
              <TouchableOpacity
                style={styles.svgWrapper}
                onPress={() => setKeepVisible(prev => !prev)}>
                <SvgIcon
                  name={keepVisible ? 'Checkbox' : 'Square'}
                  fill={lightTheme.gray}
                  size={14}
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
