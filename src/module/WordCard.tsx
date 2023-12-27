import React, {PropsWithChildren, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Voca from '../model/Voca';

import useUtil from '../hooks/util';
import usePolly from '../hooks/polly';
import useDidMountEffect from '../hooks/didMount';
import {useIsFocused} from '@react-navigation/native';

import images from '../styles/images';
import styles from '../styles/WordCardStyle';
import {lightTheme} from '../styles/colors';

type WordCardProps = PropsWithChildren<{
  wordData: Voca;
  marginVertical?: number;
  moveToDetailPage: (_id: number) => void;
}>;

function WordCard({
  wordData,
  marginVertical = 7,
  moveToDetailPage,
}: WordCardProps): JSX.Element {
  const {sound, lanternOff, lanternOn, book} = images.module;
  const {_id, word, meaning, intonation, bookmarked, level} = wordData;

  const {setToggle} = usePolly();
  const isFocused = useIsFocused();
  const {handleBookmark} = useUtil();
  const [touched, setTouched] = useState(false);
  const [bookmark, setBookmark] = useState(bookmarked);

  useDidMountEffect(() => {
    if (isFocused) {
      bookmark !== bookmarked && setBookmark(bookmarked);
    }
  }, [isFocused]);

  return (
    <TouchableOpacity
      onPress={() => moveToDetailPage(_id)}
      activeOpacity={0.7}
      style={[styles.container, {marginVertical}]}>
      <View style={styles.preview}>
        <TouchableOpacity
          onPress={() => setToggle({word, level})}
          style={styles.imgWrapper}>
          <Image style={styles.img} source={sound} />
        </TouchableOpacity>
        <Text style={word.length > 4 ? styles.longHanzi : styles.hanzi}>
          {word}
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => moveToDetailPage(_id)}
            style={styles.imgWrapper}>
            <Image style={styles.img} source={book} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imgWrapper}
            onPress={() => handleBookmark({setBookmark, _id, word, bookmark})}>
            <Image
              style={styles.img}
              source={bookmark ? lanternOn : lanternOff}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          touched
            ? {backgroundColor: lightTheme.ligthGray}
            : {backgroundColor: lightTheme.red},
        ]}
        onPress={() => setTouched(!touched)}>
        {touched ? (
          <>
            <Text style={styles.pinyin}>{intonation}</Text>
            <Text
              textBreakStrategy="balanced"
              lineBreakStrategyIOS="hangul-word"
              style={styles.meaning}>
              {meaning}
            </Text>
          </>
        ) : (
          <Text style={styles.tmoneyText}>touch</Text>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default WordCard;
