import React, {PropsWithChildren, useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import {lightTheme} from '../styles/colors';

type TimerProps = PropsWithChildren<{
  currentPage: number;
  duration: number;
}>;

const width = Dimensions.get('screen').width;

function Timer({currentPage, duration}: TimerProps) {
  const timer = useRef(new Animated.Value(width * 0.8 + 20));

  useEffect(() => {
    timer.current.setValue(width);
    Animated.timing(timer.current, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  }, [timer, currentPage, duration]);

  return (
    <View style={styles.container}>
      <View style={styles.bottomBar} />
      <Animated.View
        style={[styles.line, {transform: [{translateX: timer.current}]}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  bottomBar: {
    width: width * 0.8,
    height: 5,
    backgroundColor: lightTheme.white,
    borderRadius: 5,
  },
  line: {
    top: 0,
    position: 'absolute',
    width: width,
    zIndex: 10,
    height: 5,
    backgroundColor: lightTheme.darkRed,
  },
});

export default Timer;
