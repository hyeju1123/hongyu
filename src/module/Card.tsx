import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {lightTheme} from '../styles/colors';

type CardProps = PropsWithChildren<{
  marginVertical?: number;
  theme?: string;
  noShadow?: boolean;
}>;

function Card({
  noShadow = false,
  children,
  marginVertical = 5,
  theme = 'red',
}: CardProps): JSX.Element {
  return (
    <View
      style={[
        theme === 'red' ? styles.shdaow : styles.whiteShdaow,
        noShadow && styles.noShadow,
        {marginVertical},
      ]}>
      <View style={theme === 'red' ? styles.card : styles.whiteCard}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: lightTheme.red,
    borderRadius: 8,
    padding: 10,
  },
  shdaow: {
    backgroundColor: lightTheme.darkRed,
    borderRadius: 8,
    paddingBottom: 3,
  },
  noShadow: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  whiteCard: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: lightTheme.white,
    borderRadius: 8,
    padding: 10,
  },
  whiteShdaow: {
    backgroundColor: lightTheme.shadowGray,
    borderRadius: 8,
    paddingBottom: 3,
  },
});

export default Card;
