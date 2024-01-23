import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from '../styles/module/WordCardStyle';

type ContentProps = {
  meaning: string;
  intonation: string;
};

type VocaCardContentProps = ContentProps & {isBusu: boolean};

const Content = ({intonation, meaning}: ContentProps): JSX.Element => (
  <>
    <Text style={[styles.meaningText, styles.redText]}>{intonation}</Text>
    <Text
      textBreakStrategy="balanced"
      lineBreakStrategyIOS="hangul-word"
      style={styles.meaningText}>
      {meaning}
    </Text>
  </>
);

function VocaCardContent({
  isBusu,
  meaning,
  intonation,
}: VocaCardContentProps): JSX.Element {
  const [touched, setTouched] = useState(isBusu);

  const handleTouch = () => {
    setTouched(prev => !prev);
  };

  return (
    <TouchableOpacity
      onPress={isBusu ? undefined : handleTouch}
      activeOpacity={isBusu ? 1 : 0.2}
      style={[styles.content, touched ? styles.touched : styles.notTouched]}>
      {touched && <Content intonation={intonation} meaning={meaning} />}
      {!isBusu && !touched && (
        <Text style={[styles.meaningText, styles.redText]}>touch</Text>
      )}
    </TouchableOpacity>
  );
}

export default VocaCardContent;
