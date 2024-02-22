import React, {FC, PropsWithChildren} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SvgIcon from './SvgIcon';
import {SvgProps} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';
import styles from '../styles/module/FlatCardStyle';

type FlatCardProps = PropsWithChildren<{
  marginVertical?: number;
  navFn: () => void;
  Icon: FC<SvgProps>;
  title: string;
  desc: string;
}>;

function FlatCard({navFn, Icon, title, desc}: FlatCardProps): JSX.Element {
  const {
    colors: {secondary, textSecondary},
  } = useTheme();
  const {width, height} = styles.icon;

  return (
    <TouchableOpacity
      onPress={navFn}
      style={[styles.card, {backgroundColor: secondary}]}>
      <Icon width={Number(width)} height={Number(height)} />
      <View style={styles.textWrapper}>
        <SvgIcon
          name="MainArrow"
          fill={textSecondary}
          size={styles.mainArrow.width}
        />
        <Text style={[styles.title, {color: textSecondary}]}>{title}</Text>
        <Text style={[styles.desc, {color: textSecondary}]}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default FlatCard;
