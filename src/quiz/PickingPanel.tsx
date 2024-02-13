import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, TouchableOpacity, Text, View} from 'react-native';
import {Word} from '../recoil/WordListState';

import useUtil from '../hooks/util';

import styles from '../styles/quiz/PickingPanelStyle';
import {useVoca} from '../providers/VocaProvider';
import {lightTheme} from '../styles/colors';
import SoundButton from '../module/SoundButton';

type PickingPanelProps = {
  index: number;
  wordData: Word[];
  corrected: number[];
  listening?: boolean;
};

type PickDataProps = {
  picked: string;
  correct: boolean;
};

const CARD_NUM = 4;

function PickingPanel({
  index,
  wordData,
  corrected,
  listening = false,
}: PickingPanelProps): JSX.Element {
  const {mint, mildYellow} = lightTheme;
  const {shuffleArray} = useUtil();
  const {getVocasByLevel} = useVoca();
  const [layoutWidth, setLayoutWidth] = useState(0);

  const [pickData, setPickData] = useState<PickDataProps[]>(
    wordData.map(() => ({picked: '', correct: false})),
  );
  const totalLen = useRef(wordData.length).current;
  const [candidates, setCandidates] = useState<string[]>([]);
  const candidatesRef = useRef<string[][]>(
    Array.from({length: totalLen}, () => []),
  );

  const {picked, correct} = pickData[index];
  const {_id, word, intonation, meaning, level} = wordData[index];

  const handlePick = useCallback(
    (pickedOne: string, answer: string) => {
      if (picked !== '') {
        return;
      }

      const result = answer === pickedOne || false;
      result && corrected.push(_id);

      setPickData(prev =>
        prev.map((v, i) =>
          i === index ? {picked: pickedOne, correct: result} : v,
        ),
      );
    },
    [index, picked, corrected, _id],
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
      const randomLevel = Math.floor(Math.random() * 6) + 1;
      const samples = getVocasByLevel(randomLevel);

      const getCandidates = (): string[] => {
        const ids = [_id];
        const meanings = [meaning];

        while (ids.length < CARD_NUM) {
          let randomIdx = Math.floor(Math.random() * samples.length);
          if (!ids.includes(samples[randomIdx]._id)) {
            ids.push(randomIdx);
            meanings.push(samples[randomIdx].meaning);
          }
        }

        return shuffleArray(meanings);
      };
      const candidatesData = getCandidates();
      candidatesRef.current = candidatesRef.current.map((v, i) =>
        i === index ? candidatesData : v,
      );
      setCandidates(candidatesData);
    } else {
      setCandidates(candidatesRef.current[index]);
    }
  }, [
    _id,
    index,
    meaning,
    picked,
    candidatesRef,
    shuffleArray,
    getVocasByLevel,
  ]);

  return (
    <View style={styles.panel}>
      <View style={styles.panelPart}>
        {listening ? (
          <SoundButton word={word} level={level} largeSize />
        ) : (
          <Text style={styles.query}>{word}</Text>
        )}
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
