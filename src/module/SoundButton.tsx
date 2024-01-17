import React, {PropsWithChildren} from 'react';
import {TouchableOpacity} from 'react-native';
import SvgIcon from './SvgIcon';
import usePolly from '../hooks/polly';

type SoundButtonProps = PropsWithChildren<{
  level: number;
  word: string;
}>;

function SoundButton({level, word}: SoundButtonProps) {
  const {setToggle} = usePolly();

  return (
    <TouchableOpacity onPress={() => setToggle({word, level})}>
      <SvgIcon name="Sound" size={20} />
    </TouchableOpacity>
  );
}

export default React.memo(SoundButton);
