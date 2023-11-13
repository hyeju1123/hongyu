import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {lightTheme} from '../styles/colors';

type CardProps = PropsWithChildren<{
  marginVertical?: number;
  theme?: string;
}>;

function Card({
  children,
  marginVertical = 5,
  theme = 'red',
}: CardProps): JSX.Element {
  return (
    <View
      style={[
        theme === 'red' ? styles.shdaow : styles.whiteShdaow,
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
