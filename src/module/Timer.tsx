import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {View, Animated, Dimensions} from 'react-native';
import SvgIcon from './SvgIcon';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/module/TimerStyle';

type TimerProps = PropsWithChildren<{
  currentPage: number;
  duration: number;
}>;

const width = Dimensions.get('screen').width;
const URGENT_SECOND = 3000;

function Timer({currentPage, duration}: TimerProps) {
  const {
    colors: {warning, deepShadow, ongoingState, background},
  } = useTheme();

  const timer = useRef(new Animated.Value(width * 0.8));
  const urgentTimeout = useRef<NodeJS.Timeout | null>(null);
  const [urgent, setUrgent] = useState(false);

  useEffect(() => {
    urgentTimeout.current !== null && clearTimeout(urgentTimeout.current);
    timer.current.setValue(width * 0.8);
    setUrgent(false);
    urgentTimeout.current = setTimeout(() => {
      setUrgent(true);
    }, duration - URGENT_SECOND);

    Animated.timing(timer.current, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  }, [timer, currentPage, duration]);

  return (
    <>
      <SvgIcon
        name="StopWatch"
        size={styles.icon.width}
        fill={urgent ? warning : deepShadow}
      />
      <View style={styles.container}>
        <View
          style={[
            styles.bottomBar,
            {
              backgroundColor: urgent ? warning : ongoingState,
            },
          ]}
        />
        <Animated.View
          style={[
            {...styles.line, backgroundColor: background},
            {transform: [{translateX: timer.current}]},
          ]}
        />
      </View>
    </>
  );
}

export default Timer;
