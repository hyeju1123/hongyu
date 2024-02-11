import React, {PropsWithChildren, memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import SvgIcon from './SvgIcon';
import usePolly from '../hooks/polly';

type SoundButtonProps = PropsWithChildren<{
  level: number;
  word: string;
}>;

function SoundButton({level, word}: SoundButtonProps) {
  const {setToggle} = usePolly();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => setToggle({word, level})}>
      <SvgIcon name="Sound" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
  },
});

export default memo(SoundButton);
