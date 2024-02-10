import React, {PropsWithChildren, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {BaseButton} from 'react-native-gesture-handler';
import {Word} from '../recoil/WordListState';
import useQuiz from '../hooks/quiz';
import useDidMountEffect from '../hooks/didMount';

import {lightTheme} from '../styles/colors';
import styles from '../styles/quiz/MatchingQuizGridStyle';

const MARKED_DURATION = 250;
const CORRECT_VERIFIED_VALUE = '  ';

type MatchingQuizGridProps = PropsWithChildren<{
  words: Word[];
  correctedIds: number[];
  handleAllClear: () => void;
}>;

function MatchingQuizGrid({
  words,
  correctedIds,
  handleAllClear,
}: MatchingQuizGridProps): JSX.Element {
  const correctedNum = useRef(0);
  const {getWordDict, getWordList} = useQuiz();
  const wordDict = getWordDict(words);
  const [tempText, setTempText] = useState('');
  const [wordList, setWordList] = useState(getWordList(words));
  const [correctPair, setCorrectPair] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<string[]>([]);

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
        correctedIds.push(_id);
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
      {wordList.map((value, idx) => (
        <BaseButton
          key={idx}
          exclusive={false}
          enabled={value !== CORRECT_VERIFIED_VALUE}
          onPress={() => tryMatching(value)}
          style={[styles.card, {backgroundColor: setCardColor(value)}]}>
          <View accessible accessibilityRole="button">
            <Text style={styles.cardText}>{value}</Text>
          </View>
        </BaseButton>
      ))}
    </View>
  );
}

export default MatchingQuizGrid;
