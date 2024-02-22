import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/module/WordCardStyle';

type ContentProps = {
  primary: string;
  textPrimary: string;
  meaning: string;
  intonation: string;
};

type WordCardContentProps = {
  isBusu: boolean;
  meaning: string;
  intonation: string;
};

const Content = ({
  primary,
  textPrimary,
  intonation,
  meaning,
}: ContentProps): JSX.Element => (
  <>
    <Text style={[styles.meaningText, {color: primary}]}>{intonation}</Text>
    <Text
      textBreakStrategy="balanced"
      lineBreakStrategyIOS="hangul-word"
      style={[styles.meaningText, {color: textPrimary}]}>
      {meaning}
    </Text>
  </>
);

function WordCardContent({
  isBusu,
  meaning,
  intonation,
}: WordCardContentProps): JSX.Element {
  const {
    colors: {primary, textPrimary, iconPrimary, background, contentBackground},
  } = useTheme();

  const [touched, setTouched] = useState(isBusu);

  const handleTouch = () => {
    setTouched(prev => !prev);
  };

  return (
    <TouchableOpacity
      onPress={isBusu ? undefined : handleTouch}
      activeOpacity={isBusu ? 1 : 0.2}
      style={[
        styles.content,
        touched
          ? {backgroundColor: contentBackground}
          : {
              ...styles.notTouched,
              borderColor: iconPrimary,
              backgroundColor: background,
            },
      ]}>
      {touched && (
        <Content
          primary={primary}
          textPrimary={textPrimary}
          intonation={intonation}
          meaning={meaning}
        />
      )}
      {!isBusu && !touched && (
        <Text style={[styles.meaningText, {color: iconPrimary}]}>touch</Text>
      )}
    </TouchableOpacity>
  );
}

export default WordCardContent;
