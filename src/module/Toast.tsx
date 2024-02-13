import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, Animated} from 'react-native';
import {useRecoilState} from 'recoil';
import {ToastIcon, toastState} from '../recoil/ToastState';
import styles from '../styles/module/ToastStyle';

import SvgIcon from './SvgIcon';
import {lightTheme} from '../styles/colors';

function Toast(): JSX.Element {
  const [toastData, setToastData] = useRecoilState(toastState);
  const {status, text, icon} = toastData;

  const [toastDisplay, setToastDisplay] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setToastDisplay(true);
    });
  }, [fadeAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setToastDisplay(false);
    });
  }, [fadeAnim]);

  useEffect(() => {
    status ? fadeIn() : fadeOut();
  }, [status, fadeIn, fadeOut]);

  const {green, warning} = lightTheme;

  return (
    <Animated.View
      style={[
        styles.container,
        toastDisplay ? styles.displayFlex : styles.displayNone,
        {opacity: fadeAnim},
      ]}>
      <SvgIcon
        name={icon === ToastIcon.Normal ? 'CheckCircle' : 'Warning'}
        size={15}
        fill={icon === ToastIcon.Normal ? green : warning}
      />
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity
        onPress={() => setToastData(prev => ({...prev, status: false}))}>
        <SvgIcon name="Cross" size={10} fill={lightTheme.black} />
      </TouchableOpacity>
    </Animated.View>
  );
}

export default Toast;
