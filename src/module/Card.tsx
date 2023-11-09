import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {lightTheme} from '../styles/colors';

type CardProps = PropsWithChildren<{
  marginVertical?: number;
}>;

function Card({children, marginVertical = 5}: CardProps): JSX.Element {
  return (
    <View style={[styles.shdaow, {marginVertical}]}>
      <View style={styles.card}>{children}</View>
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
});

export default Card;
