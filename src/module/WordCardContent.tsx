import React, {useRef, useState} from 'react';
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
  id: number;
  isBusu: boolean;
  meaning: string;
  intonation: string;
  priorTouched: number[];
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
  id,
  isBusu,
  meaning,
  intonation,
  priorTouched,
}: WordCardContentProps): JSX.Element {
  const lastItemId = useRef(id);

  const {
    colors: {primary, textPrimary, iconPrimary, background, contentBackground},
  } = useTheme();

  const [touched, setTouched] = useState(isBusu);

  const handleTouch = () => {
    if (touched) {
      const idx = priorTouched.indexOf(id);
      priorTouched.splice(idx, 1);
    } else {
      priorTouched.push(id);
    }
    setTouched(prev => !prev);
  };

  if (!isBusu && id !== lastItemId.current) {
    lastItemId.current = id;
    setTouched(priorTouched.includes(id));
  }

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
