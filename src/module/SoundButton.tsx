import React, {PropsWithChildren, memo} from 'react';
import {TouchableOpacity} from 'react-native';
import SvgIcon from './SvgIcon';
import usePolly from '../hooks/polly';
import styles from '../styles/module/SoundButtonStyle';
import iconSize from '../styles/iconSize';

type SoundButtonProps = PropsWithChildren<{
  level: number;
  word: string;
  largeSize?: boolean;
}>;

function SoundButton({level, word, largeSize = false}: SoundButtonProps) {
  const {largeVersionSound, smallVersionSound} = iconSize;
  const {setToggle} = usePolly();

  return (
    <TouchableOpacity
      style={[styles.button, largeSize && styles.alignCenter]}
      onPress={() => setToggle({word, level})}>
      <SvgIcon
        name="Sound"
        size={largeSize ? largeVersionSound : smallVersionSound}
      />
    </TouchableOpacity>
  );
}

export default memo(SoundButton);
