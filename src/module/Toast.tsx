import React, {useCallback, useEffect, useRef} from 'react';
import {Text, Image, TouchableOpacity, Animated} from 'react-native';
import {useRecoilState} from 'recoil';
import {toastState} from '../recoil/ToastState';
import styles from '../styles/ToastStyle';
import images from '../styles/images';

function Toast(): JSX.Element {
  const [toastData, setToastData] = useRecoilState(toastState);
  const {status, text, icon} = toastData;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    status ? fadeIn() : fadeOut();
  }, [status, fadeIn, fadeOut]);

  const {module} = images;

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <Image style={styles.icon} source={module[icon]} />
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity
        onPress={() => setToastData(prev => ({...prev, status: false}))}>
        <Image style={styles.closeImage} source={module.closed} />
      </TouchableOpacity>
    </Animated.View>
  );
}

export default Toast;
