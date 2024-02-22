import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import styles from '../styles/module/CardStyle';
import {useTheme} from '@react-navigation/native';

type CardProps = PropsWithChildren<{
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginVertical?: number;
  showShadow?: boolean;
  dirRow?: boolean;
  color?: string;
  underColor?: string;
}>;

function Card({
  children,
  color,
  underColor,
  dirRow = false,
  showShadow = false,
  marginVertical = 5,
  paddingVertical = 10,
  paddingHorizontal = 10,
}: CardProps): JSX.Element {
  const {
    colors: {shadow, background, cardBorderLine},
  } = useTheme();

  return (
    <View
      style={[
        styles.underdressing,
        showShadow && styles.shadow,
        {
          marginVertical,
          shadowColor: shadow,
          backgroundColor: underColor || shadow,
        },
      ]}>
      <View
        style={[
          styles.card,
          dirRow && styles.flexRow,
          {
            paddingVertical,
            paddingHorizontal,
            borderColor: cardBorderLine,
            backgroundColor: color || background,
          },
        ]}>
        {children}
      </View>
    </View>
  );
}

export default Card;
