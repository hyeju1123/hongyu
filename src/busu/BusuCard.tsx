import React, {PropsWithChildren, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Busu from '../model/Busu';

import useUtil from '../hooks/util';
import useDidMountEffect from '../hooks/didMount';
import {useIsFocused} from '@react-navigation/native';

import images from '../styles/images';
import styles from '../styles/WordCardStyle';
import {lightTheme} from '../styles/colors';

type BusuCardProps = PropsWithChildren<{
  busuData: Busu;
  marginVertical?: number;
  moveToDetailPage: (busuData: Busu) => void;
}>;

function BusuCard({
  busuData,
  marginVertical = 7,
  moveToDetailPage,
}: BusuCardProps): JSX.Element {
  const {lanternOff, lanternOn, book} = images.module;
  const {_id, busu, yin, xunyin, bookmarked} = busuData;

  const isFocused = useIsFocused();
  const {handleBookmark} = useUtil();
  const [bookmark, setBookmark] = useState(bookmarked);

  useDidMountEffect(() => {
    if (isFocused) {
      bookmark !== bookmarked && setBookmark(bookmarked);
    }
  }, [isFocused]);

  return (
    <TouchableOpacity
      onPress={() => moveToDetailPage(busuData)}
      activeOpacity={0.7}
      style={[styles.container, {marginVertical}]}>
      <View style={styles.preview}>
        <TouchableOpacity
          onPress={() => moveToDetailPage(busuData)}
          style={styles.imgWrapper}>
          <Image style={styles.img} source={book} />
        </TouchableOpacity>
        <Text style={busu.length > 3 ? styles.longHanzi : styles.hanzi}>
          {busu}
        </Text>
        <View>
          <TouchableOpacity
            style={styles.imgWrapper}
            onPress={() =>
              handleBookmark({
                setBookmark,
                _id,
                word: busu,
                bookmark,
                busu: true,
              })
            }>
            <Image
              style={styles.img}
              source={bookmark ? lanternOn : lanternOff}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.button, {backgroundColor: lightTheme.ligthGray}]}>
        <Text style={styles.pinyin}>{yin}</Text>
        <Text
          textBreakStrategy="balanced"
          lineBreakStrategyIOS="hangul-word"
          style={styles.meaning}>
          {xunyin}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default BusuCard;
