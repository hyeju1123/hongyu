import React, {FC, PropsWithChildren} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/module/FlatCardStyle';
import SvgIcon from './SvgIcon';
import {SvgProps} from 'react-native-svg';
import {lightTheme} from '../styles/colors';
import iconSize from '../styles/iconSize';

type FlatCardProps = PropsWithChildren<{
  marginVertical?: number;
  navFn: () => void;
  Icon: FC<SvgProps>;
  title: string;
  desc: string;
}>;

function FlatCard({navFn, Icon, title, desc}: FlatCardProps): JSX.Element {
  const {serviceSectionHeight, serviceSectionWidth} = iconSize;
  return (
    <TouchableOpacity onPress={navFn} style={[styles.card]}>
      <Icon width={serviceSectionWidth} height={serviceSectionHeight} />
      <View style={styles.textWrapper}>
        <SvgIcon name="MainArrow" size={18} fill={lightTheme.white} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default FlatCard;
