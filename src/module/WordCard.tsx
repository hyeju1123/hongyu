import React, {PropsWithChildren, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {lightTheme} from '../styles/colors';
import {fonts} from '../styles/fonts';
import Voca from '../model/Voca';
import {useRealm} from '../../RealmConfigContext';
import images from '../styles/images';
import {updateBookmark} from '../service/updateData';

type WordCardProps = PropsWithChildren<{
  wordData: Voca;
  handleSoundToggle: (word: string) => void;
  marginVertical?: number;
  navigate: (_id: number) => void;
}>;

function WordCard({
  wordData,
  handleSoundToggle,
  marginVertical = 7,
  navigate,
}: WordCardProps): JSX.Element {
  const realm = useRealm();
  const [touched, setTouched] = useState(false);
  const {_id, word, meaning, intonation, bookmarked} = wordData;
  const {sound, lanternOff, lanternOn, book} = images.module;

  return (
    <View style={[styles.container, {marginVertical}]}>
      <View style={styles.preview}>
        <TouchableOpacity
          onPress={() => handleSoundToggle(word)}
          style={styles.imgWrapper}>
          <Image style={styles.img} source={sound} />
        </TouchableOpacity>
        <Text style={styles.hanzi}>{word}</Text>
        <View>
          <TouchableOpacity
            onPress={() => navigate(_id)}
            style={styles.imgWrapper}>
            <Image style={styles.img} source={book} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imgWrapper}
            onPress={() => updateBookmark(realm, _id, !bookmarked)}>
            <Image
              style={styles.img}
              source={bookmarked ? lanternOn : lanternOff}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: lightTheme.white,
    borderRadius: 10,
  },
  preview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgWrapper: {
    padding: 5,
    alignSelf: 'flex-start',
  },
  img: {
    width: 23,
    height: 23,
  },
  hanzi: {
    fontFamily: fonts.hanzi,
    fontSize: 45,
    color: lightTheme.black,
  },
  button: {
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
  },
  tmoneyText: {
    fontFamily: fonts.pinyin,
    fontSize: 20,
    color: lightTheme.white,
  },
  pinyin: {
    fontFamily: fonts.pinyin,
    fontSize: 15,
    color: lightTheme.gray,
  },
  meaning: {
    fontFamily: fonts.main,
    fontSize: 15,
    textAlign: 'center',
    color: lightTheme.black,
    lineHeight: 27,
    marginTop: 5,
    marginBottom: -3,
  },
});

export default WordCard;
