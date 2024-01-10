import React, {FC, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, PixelRatio, Button} from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Circle} from 'react-native-svg';

type CircularTimerProps = {
  strokeWidth?: number;
  radius?: number;
  backgroundColor?: string;
  percentageComplete?: number;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const STROKE_WIDTH = 5;
const defaultRadius = PixelRatio.roundToNearestPixel(50);

//const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularTimer: FC<CircularTimerProps> = ({
  radius = defaultRadius,
  strokeWidth = STROKE_WIDTH,
  backgroundColor = 'pink',
  percentageComplete = 100,
}) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumfrence = 2 * Math.PI * innerRadius;
  const [AnimatedCircle, setAnimatedCircle] = useState(
    Animated.createAnimatedComponent(Circle),
  );
  const invertedCompletion = (100 - percentageComplete) / 100;
  const theta = useSharedValue(2 * Math.PI);
  const animateTo = useDerivedValue(() => 2 * Math.PI * 0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(theta.value * innerRadius, {
        duration: 5000,
        easing: Easing.linear,
      }),
    };
  });

  useEffect(() => {
    const startTimer = () => {
      theta.value = animateTo.value;
    };

    console.log('ho');
    startTimer();
    setAnimatedCircle(Animated.createAnimatedComponent(Circle));
    return () => {
      theta.value = 0;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={radius}
          cy={radius}
          r={innerRadius}
          fill={'transparent'}
          stroke={backgroundColor}
          strokeDasharray={`${circumfrence} ${circumfrence}`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export default CircularTimer;
