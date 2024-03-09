import React, {PropsWithChildren} from 'react';
import {TouchableOpacity} from 'react-native';
import SvgIcon from './SvgIcon';
import usePolly from '../hooks/polly';
import styles from '../styles/module/SoundButtonStyle';

type SoundButtonProps = PropsWithChildren<{
  level: number;
  word: string;
  largeSize?: boolean;
}>;

function SoundButton({level, word, largeSize = false}: SoundButtonProps) {
  const {setToggle} = usePolly();

  return (
    <TouchableOpacity
      style={[styles.button, largeSize && styles.alignCenter]}
      onPress={() => setToggle({word, level})}>
      <SvgIcon
        name="Sound"
        size={largeSize ? styles.largeVer.width : styles.smallVer.width}
      />
    </TouchableOpacity>
  );
}

export default SoundButton;
