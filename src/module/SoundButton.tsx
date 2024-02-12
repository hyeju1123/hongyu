import React, {PropsWithChildren, memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import SvgIcon from './SvgIcon';
import usePolly from '../hooks/polly';

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
      <SvgIcon name="Sound" size={largeSize ? 50 : 20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
  },
  alignCenter: {
    alignSelf: 'center',
  },
});

export default memo(SoundButton);
