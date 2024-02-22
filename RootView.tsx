import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigation from './src/navigation/RootNavigation';
import Toast from './src/module/Toast';
import {StyleSheet} from 'react-native';
import {useRecoilState} from 'recoil';
import {ThemeType, themeState} from './src/recoil/ThemeState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {darkTheme, lightTheme} from './src/styles/colors';

function RootView(): JSX.Element {
  const [theme, setTheme] = useRecoilState(themeState);
  const backgroundColor =
    theme === 'dark'
      ? darkTheme.colors.background
      : lightTheme.colors.background;

  useEffect(() => {
    const initTheme = async () => {
      const saved = (await AsyncStorage.getItem('theme')) as ThemeType;
      saved && setTheme(saved);
    };
    initTheme();
  }, [setTheme]);

  return (
    <GestureHandlerRootView style={[styles.container, {backgroundColor}]}>
      <RootNavigation />
      <Toast />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootView;
