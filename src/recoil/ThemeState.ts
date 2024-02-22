import {Appearance} from 'react-native';
import {atom} from 'recoil';

export type ThemeType = 'light' | 'dark';
export const defaultTheme = Appearance.getColorScheme() || 'light';

export const themeState = atom<ThemeType>({
  key: 'themeState',
  default: defaultTheme,
});
