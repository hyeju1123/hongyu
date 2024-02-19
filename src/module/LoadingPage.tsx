import React, {useCallback, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import images from '../styles/images';
import {fonts} from '../styles/fonts';
import {lightTheme} from '../styles/colors';

function LoadingPage(): JSX.Element {
  const {
    module: {dumpling},
  } = images;

  const bounceValue = useRef(new Animated.Value(0)).current;

  const startBounceAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceValue]);

  useEffect(() => {
    startBounceAnimation();
  }, [startBounceAnimation]);

  const animatedStyle = {
    transform: [
      {
        translateY: bounceValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-30, 30],
        }),
      },
    ],
  };

  return (
    <View style={styles.loadingWrapper}>
      <Animated.Image
        resizeMode="contain"
        style={[styles.image, animatedStyle]}
        source={dumpling}
      />
      <Text style={styles.fonts}>Loading ...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '50%',
  },
  fonts: {
    fontFamily: fonts.mainBold,
    color: lightTheme.background,
    fontSize: 25,
  },
});

export default LoadingPage;
