import React, {FC, PropsWithChildren} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/module/FlatCardStyle';
import SvgIcon from './SvgIcon';
import {SvgProps} from 'react-native-svg';
import {lightTheme} from '../styles/colors';

type FlatCardProps = PropsWithChildren<{
  marginVertical?: number;
  navFn: () => void;
  Icon: FC<SvgProps>;
  title: string;
  desc: string;
}>;

function FlatCard({navFn, Icon, title, desc}: FlatCardProps): JSX.Element {
  return (
    <TouchableOpacity onPress={navFn} style={[styles.card]}>
      <Icon width={140} height={85} />
      <View style={styles.textWrapper}>
        <SvgIcon name="MainArrow" size={18} fill={lightTheme.white} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default FlatCard;
