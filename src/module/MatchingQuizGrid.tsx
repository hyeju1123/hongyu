import React, {
  MutableRefObject,
  PropsWithChildren,
  useRef,
  useState,
} from 'react';
import {FlatList, Text, View} from 'react-native';
import {BaseButton} from 'react-native-gesture-handler';
import {Word} from '../recoil/WordListState';
import useQuiz from '../hooks/quiz';
import useDidMountEffect from '../hooks/didMount';
import {ResultDataProps} from '../quiz/QuizResultPage';

import {lightTheme} from '../styles/colors';
import styles from '../styles/quiz/MatchingQuizGridStyle';

const MARKED_DURATION = 250;
const CORRECT_VERIFIED_VALUE = '  ';

type MatchingQuizGridProps = PropsWithChildren<{
  words: Word[];
  quizResult: MutableRefObject<ResultDataProps[]>;
  handleAllClear: () => void;
}>;

function MatchingQuizGrid({
  words,
  quizResult,
  handleAllClear,
}: MatchingQuizGridProps): JSX.Element {
  const correctedNum = useRef(0);
  const {getWordDict, getWordList} = useQuiz();
  const wordDict = getWordDict(words);
  const [tempText, setTempText] = useState('');
  const [wordList, setWordList] = useState(getWordList(words));
  const [correctPair, setCorrectPair] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<string[]>([]);
  const [layoutWidth, setLayoutWidth] = useState(0);

  const indicateCorrect = (pair: string[]) => {
    correctedNum.current += 1;
    setCorrectPair(pair);

    setTimeout(() => {
      setCorrectPair([]);
      setWordList(prev =>
        prev.map(value =>
          pair.includes(value) ? CORRECT_VERIFIED_VALUE : value,
        ),
      );
      correctedNum.current === words.length && handleAllClear();
    }, MARKED_DURATION);
  };

  const indicateWrong = (pair: string[]) => {
    setWrongPair(pair);
    setTimeout(() => {
      setWrongPair([]);
    }, MARKED_DURATION);
  };

  const checkAnswer = (pair: string[]) => {
    for (const {_id, word, meaning} of wordDict) {
      if ([word, meaning].every(item => pair.includes(item))) {
        quizResult.current = quizResult.current.map(prev =>
          prev._id === _id ? {...prev, correct: true} : prev,
        );
        return true;
      }
    }
    return false;
  };

  const tryMatching = (pickedText: string) => {
    if (!tempText) {
      setTempText(pickedText);
      return;
    }

    const isMatched = checkAnswer([pickedText, tempText]);

    isMatched
      ? indicateCorrect([pickedText, tempText])
      : indicateWrong([pickedText, tempText]);

    setTempText('');
  };

  const setCardColor = (value: string) => {
    let color: string = lightTheme.transGray;

    color = tempText === value ? lightTheme.transBlack : color;
    color = value === '  ' ? lightTheme.transparent : color;
    color = correctPair.includes(value) ? lightTheme.mint : color;
    color = wrongPair.includes(value) ? lightTheme.mildYellow : color;

    return color;
  };

  useDidMountEffect(() => {
    correctedNum.current = 0;
    setTempText('');
    setWordList(getWordList(words));
  }, [words, getWordList]);

  return (
    <View style={styles.cardWrapper}>
      <FlatList
        data={wordList}
        style={styles.flatList}
        columnWrapperStyle={[styles.columnWrapperStyle, {width: layoutWidth}]}
        onLayout={e => setLayoutWidth(e.nativeEvent.layout.width)}
        renderItem={({item, index}: {item: string; index: number}) => (
          <BaseButton
            key={index}
            exclusive={false}
            enabled={item !== CORRECT_VERIFIED_VALUE}
            onPress={() => tryMatching(item)}
            style={[
              styles.card,
              {
                width: layoutWidth / 2 - 5,
                backgroundColor: setCardColor(item),
              },
            ]}>
            <View accessible accessibilityRole="button">
              <Text style={styles.cardText}>{item}</Text>
            </View>
          </BaseButton>
        )}
        numColumns={2}
        scrollEnabled={false}
      />
    </View>
  );
}

export default MatchingQuizGrid;
