import React, {PropsWithChildren} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import images from '../styles/images';
import styles from '../styles/CompleteButtonStyle';

type CompleteButtonProps = PropsWithChildren<{
  updateFn: () => void;
}>;

function CompleteButton({updateFn}: CompleteButtonProps): JSX.Element {
  const {
    module: {checked},
  } = images;
  return (
    <TouchableOpacity onPress={() => updateFn()} style={styles.completeBtn}>
      <Image source={checked} style={styles.completeImg} />
    </TouchableOpacity>
  );
}

export default CompleteButton;
