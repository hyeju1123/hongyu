import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import styles from '../styles/CardStyle';

type CardProps = PropsWithChildren<{
  paddingHorizontal?: number;
  marginVertical?: number;
  theme?: string;
  noShadow?: boolean;
  dirRow?: boolean;
}>;

function Card({
  noShadow = false,
  children,
  dirRow = false,
  marginVertical = 5,
  paddingHorizontal = 10,
  theme = 'red',
}: CardProps): JSX.Element {
  return (
    <View
      style={[
        styles.shdaow,
        theme === 'red' && styles.shadowForRed,
        noShadow && styles.noShadow,
        {marginVertical},
      ]}>
      <View
        style={[
          styles.card,
          theme === 'red' && styles.backgroundRed,
          dirRow && styles.flexRow,
          {paddingHorizontal},
        ]}>
        {children}
      </View>
    </View>
  );
}

export default Card;
