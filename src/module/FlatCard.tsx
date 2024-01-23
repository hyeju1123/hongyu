import React, {PropsWithChildren} from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../styles/module/FlatCardStyle';
import images from '../styles/images';

type FlatCardProps = PropsWithChildren<{
  marginVertical?: number;
  navFn: () => void;
  imgSrc: ImageSourcePropType;
  title: string;
  desc: string;
}>;

function FlatCard({navFn, imgSrc, title, desc}: FlatCardProps): JSX.Element {
  const {arrow} = images.module;
  return (
    <TouchableOpacity onPress={navFn} style={[styles.card]}>
      <Image style={styles.img} source={imgSrc} />
      <View style={styles.textWrapper}>
        <Image style={styles.arrow} source={arrow} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default FlatCard;
