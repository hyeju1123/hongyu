import React, {FC, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import {lightTheme} from '../styles/colors';

type CircularTimerProps = {
  currentPage: number;
};

const width = Dimensions.get('screen').width;

const CircularTimer: FC<CircularTimerProps> = ({currentPage}) => {
  const timer = useRef(new Animated.Value(width));

  useEffect(() => {
    console.log('timer:: ', timer.current);
    timer.current.setValue(width);
    Animated.timing(timer.current, {
      toValue: 0,
      duration: 15000,
      useNativeDriver: true,
    }).start();
  }, [timer, currentPage]);

  return (
    <View style={styles.container}>
      <View style={styles.bottomBar} />
      <Animated.View
        style={[styles.line, {transform: [{translateX: timer.current}]}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  bottomBar: {
    width: width,
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

export default CircularTimer;
