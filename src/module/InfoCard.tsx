import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import styles from '../styles/InfoCardStyle';

type InfoCardProps = PropsWithChildren;

function InfoCard({children}: InfoCardProps): JSX.Element {
  return <View style={styles.container}>{children}</View>;
}

export default InfoCard;
