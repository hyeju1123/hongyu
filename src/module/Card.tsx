import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import styles from '../styles/CardStyle';
import {lightTheme} from '../styles/colors';

export enum ThemeColor {
  Red = 'red',
  DarkRed = 'darkRed',
  White = 'white',
}

type CardProps = PropsWithChildren<{
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginVertical?: number;
  theme?: ThemeColor;
  shadow?: boolean;
  underdressing?: boolean;
  dirRow?: boolean;
}>;

function Card({
  children,
  underdressing = true,
  shadow = false,
  dirRow = false,
  marginVertical = 5,
  paddingVertical = 10,
  paddingHorizontal = 10,
  theme = ThemeColor.White,
}: CardProps): JSX.Element {
  return (
    <View
      style={[
        styles.underdressing,
        theme === ThemeColor.Red && styles.redUnderdressing,
        !underdressing && styles.noUnderdressing,
        shadow && styles.shadow,
        {marginVertical},
      ]}>
      <View
        style={[
          styles.card,
          dirRow && styles.flexRow,
          {backgroundColor: lightTheme[theme]},
          {paddingVertical},
          {paddingHorizontal},
        ]}>
        {children}
      </View>
    </View>
  );
}

export default Card;
