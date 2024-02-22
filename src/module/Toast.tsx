import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, Animated} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {ToastIcon, toastState} from '../recoil/ToastState';
import styles from '../styles/module/ToastStyle';

import SvgIcon from './SvgIcon';
import {themeState} from '../recoil/ThemeState';
import {darkTheme, lightTheme} from '../styles/colors';

function Toast(): JSX.Element {
  const theme = useRecoilValue(themeState);
  const {background, textPrimary, healthy, warning} =
    theme === 'dark' ? darkTheme.colors : lightTheme.colors;

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

  return (
    <Animated.View
      style={[
        styles.container,
        toastDisplay ? styles.displayFlex : styles.displayNone,
        {opacity: fadeAnim, backgroundColor: background},
      ]}>
      <SvgIcon
        size={styles.icon.width}
        fill={icon === ToastIcon.Normal ? healthy : warning}
        name={icon === ToastIcon.Normal ? 'CheckCircle' : 'Warning'}
      />
      <Text style={[styles.text, {color: textPrimary}]}>{text}</Text>
      <TouchableOpacity
        onPress={() => setToastData(prev => ({...prev, status: false}))}>
        <SvgIcon
          name="Cross"
          fill={textPrimary}
          size={styles.closeIcon.width}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

export default Toast;
