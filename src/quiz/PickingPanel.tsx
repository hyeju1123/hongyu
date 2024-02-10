import React, {useEffect, useRef, useState} from 'react';
import {FlatList, TouchableOpacity, Text, View} from 'react-native';
import {Word} from '../recoil/WordListState';

import useUtil from '../hooks/util';

import styles from '../styles/quiz/PickingPanelStyle';
import {useVoca} from '../providers/VocaProvider';
import {lightTheme} from '../styles/colors';
import {PickDataProps} from './PickingQuizPage';

type PickingPanelProps = {
  index: number;
  totalLen: number;
  wordData: Word;
  pickData: PickDataProps;

  handlePick: (picked: string, answer: string) => void;
};

const CARD_NUM = 4;

function PickingPanel({
  index,
  totalLen,
  wordData: {word, meaning, intonation},
  pickData: {picked, correct},
  handlePick,
}: PickingPanelProps): JSX.Element {
  const {mint, mildYellow} = lightTheme;
  const {shuffleArray} = useUtil();
  const {getVocasByLevel} = useVoca();
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [candidates, setCandidates] = useState<string[]>([]);
  const candidatesRef = useRef<string[][]>(
    Array.from({length: totalLen}, () => []),
  );

  const setColor = (item: string) => {
    if (picked !== '' && item === meaning) {
      return {backgroundColor: mint};
    }
    if (item === picked && !correct) {
      return {backgroundColor: mildYellow};
    }
  };

  useEffect(() => {
    if (picked === '') {
      const level = Math.floor(Math.random() * 6) + 1;
      const samples = getVocasByLevel(level);

      const getCandidates = () => {
        const candidatesIdx = [index];
        const candidatesData = [meaning];

        while (candidatesIdx.length < CARD_NUM) {
          let randomIdx = Math.floor(Math.random() * samples.length);
          if (!candidatesIdx.includes(randomIdx)) {
            candidatesIdx.push(randomIdx);
            candidatesData.push(samples[randomIdx].meaning);
          }
        }

        return shuffleArray(candidatesData);
      };
      const candidatesData = getCandidates();
      candidatesRef.current = candidatesRef.current.map((v, i) =>
        i === index ? candidatesData : v,
      );
      setCandidates(candidatesData);
    } else {
      setCandidates(candidatesRef.current[index]);
    }
  }, [getVocasByLevel, shuffleArray, index, meaning, picked, candidatesRef]);

  return (
    <View style={styles.panel}>
      <View style={styles.panelPart}>
        <Text style={styles.query}>{word}</Text>
        <Text style={styles.pinyin}>{intonation}</Text>
      </View>
      <View style={styles.panelPart}>
        <FlatList
          style={styles.flatList}
          data={candidates}
          columnWrapperStyle={[styles.columnWrapperStyle, {width: layoutWidth}]}
          onLayout={e => setLayoutWidth(e.nativeEvent.layout.width)}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={() => handlePick(item, meaning)}
              style={[
                styles.button,
                {width: (layoutWidth - 10) / 2},
                setColor(item),
              ]}>
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}

export default PickingPanel;
