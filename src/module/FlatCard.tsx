import React, {PropsWithChildren} from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import styles from '../styles/FlatCardStyle';

type FlatCardProps = PropsWithChildren<{
  marginVertical?: number;
  imgSrc: ImageSourcePropType;
  title: string;
  desc: string;
}>;

function FlatCard({imgSrc, title, desc}: FlatCardProps): JSX.Element {
  return (
    <View style={[styles.card]}>
      <Image style={styles.img} source={imgSrc} />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </View>
  );
}

export default FlatCard;
