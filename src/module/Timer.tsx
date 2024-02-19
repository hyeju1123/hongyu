import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import SvgIcon from './SvgIcon';

import {lightTheme} from '../styles/colors';
import iconSize from '../styles/iconSize';

type TimerProps = PropsWithChildren<{
  currentPage: number;
  duration: number;
}>;

const width = Dimensions.get('screen').width;
const URGENT_SECOND = 3000;

function Timer({currentPage, duration}: TimerProps) {
  const {clock} = iconSize;
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
        size={clock}
        fill={urgent ? lightTheme.primary : lightTheme.shadow}
      />
      <View style={styles.container}>
        <View
          style={[
            styles.bottomBar,
            {
              backgroundColor: urgent
                ? lightTheme.primary
                : lightTheme.ongoingState,
            },
          ]}
        />
        <Animated.View
          style={[styles.line, {transform: [{translateX: timer.current}]}]}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  bottomBar: {
    width: width * 0.8,
    height: 5,
    borderRadius: 5,
  },
  line: {
    top: 0,
    position: 'absolute',
    width: width,
    zIndex: 10,
    height: 5,
    backgroundColor: lightTheme.background,
  },
});

export default Timer;
