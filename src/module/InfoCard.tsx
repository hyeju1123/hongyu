import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {lightTheme} from '../styles/colors';

type InfoCardProps = PropsWithChildren;

function InfoCard({children}: InfoCardProps): JSX.Element {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.white,
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default InfoCard;
