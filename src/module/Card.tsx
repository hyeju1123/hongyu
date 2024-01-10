import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {lightTheme} from '../styles/colors';

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

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.white,
    borderRadius: 8,
    padding: 10,
  },
  shdaow: {
    backgroundColor: lightTheme.shadowGray,
    borderRadius: 8,
    paddingBottom: 3,
  },
  noShadow: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  flexRow: {
    flexDirection: 'row',
  },
  backgroundRed: {
    backgroundColor: lightTheme.red,
  },
  shadowForRed: {
    backgroundColor: lightTheme.darkRed,
  },
});

export default Card;
