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
        {
          marginVertical,
          backgroundColor: underColor || shadow,
        },
      ]}>
      <View
        style={[
          styles.card,
          dirRow && styles.flexRow,
          showShadow && styles.shadow,
          {
            paddingVertical,
            paddingHorizontal,
            shadowColor: shadow,
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
