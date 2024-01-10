import React, {PropsWithChildren, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Voca from '../model/Voca';
import useQuiz from '../hooks/quiz';
import useDidMountEffect from '../hooks/didMount';

import {lightTheme} from '../styles/colors';
import styles from '../styles/MatchingQuizGridStyle';

const MARKED_DURATION = 250;

type MatchingQuizGridProps = PropsWithChildren<{
  words: Voca[];
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
        prev.map(value => (pair.includes(value) ? '  ' : value)),
      );
      checkAllClear();
    }, MARKED_DURATION);
  };

  const indicateWrong = (pair: string[]) => {
    setWrongPair(pair);
    setTimeout(() => {
      setWrongPair([]);
    }, MARKED_DURATION);
  };

  const checkAllClear = () => {
    if (correctedNum.current === 5) {
      correctedNum.current = 0;
      handleAllClear();
    }
  };

  const checkMatching = (pair: string[]) => {
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

    const isMatched = checkMatching([pickedText, tempText]);

    isMatched
      ? indicateCorrect([pickedText, tempText])
      : indicateWrong([pickedText, tempText]);

    setTempText('');
  };

  const setCardColor = (value: string) => {
    let color: string = lightTheme.white;

    color = tempText === value ? lightTheme.transWhite : color;
    color = value === '  ' ? lightTheme.transparent : color;
    color = correctPair.includes(value) ? lightTheme.mint : color;
    color = wrongPair.includes(value) ? lightTheme.salmon : color;

    return color;
  };

  useDidMountEffect(() => {
    setWordList(getWordList(words));
  }, [words, getWordList]);

  return (
    <View style={styles.cardWrapper}>
      {wordList.map((value, idx) => (
        <TouchableOpacity
          activeOpacity={1.0}
          delayLongPress={5000}
          disabled={value === '  '}
          onPress={() => tryMatching(value)}
          key={idx}
          style={[styles.card, {backgroundColor: setCardColor(value)}]}>
          <Text style={styles.cardText}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default MatchingQuizGrid;
