import {DefaultTheme, Theme} from '@react-navigation/native';

interface ExtendedTheme extends Theme {
  colors: Theme['colors'] & {
    secondary: string;
    shadow: string;
    deepShadow: string;
    ongoingState: string;
    cardBorderLine: string;
    contentBackground: string;
    textPrimary: string;
    textSecondary: string;
    mildHealthy: string;
    mildWarning: string;
    healthy: string;
    warning: string;
    iconPrimary: string;
    transparent: string;
    transparentBack: string;
    transparentContentBack: string;
    selectedState: string;
    unselectedState: string;
  };
}

export const lightTheme: ExtendedTheme = {
  dark: false,
  colors: {
    primary: '#D14124',
    secondary: '#AA351D',
    background: '#FFFFFF',
    shadow: '#BEBEBE',
    deepShadow: '#8E8E8E',
    ongoingState: '#E4E4E4',
    cardBorderLine: '#E4E4E4',
    contentBackground: '#F3F1EE',
    textPrimary: '#655858',
    textSecondary: '#FFFFFF',
    mildHealthy: '#E8FAEA',
    mildWarning: '#FFF4CE',
    healthy: '#6BBF59',
    warning: '#FFC048',
    iconPrimary: '#D14124',
    transparent: 'transparent',
    transparentBack: 'rgba(255,255,255,0.5)',
    transparentContentBack: 'rgba(243, 241, 238, 0.9)',
    selectedState: 'rgba(0,0,0,0.2)',
    unselectedState: 'rgba(228,228,228,0.3)',
    card: 'transparent',
    text: 'transparent',
    border: 'transparent',
    notification: 'transparent',
  },
};

export const darkTheme: ExtendedTheme = {
  dark: true,
  colors: {
    primary: '#0F1114',
    secondary: '#1E2022',
    background: '#282C35',
    shadow: '#0F1114',
    deepShadow: '#E4E4E4',
    ongoingState: '#8E8E8E',
    cardBorderLine: '#1E2022',
    contentBackground: '#6E727C',
    textPrimary: '#D3D4D4',
    textSecondary: '#D3D4D4',
    mildHealthy: '#94A095',
    mildWarning: '#B9B09F',
    healthy: '#4A853E',
    warning: '#CC9939',
    iconPrimary: '#D3D4D4',
    transparent: 'transparent',
    transparentBack: 'rgba(255,255,255,0.5)',
    transparentContentBack: 'rgba(110, 114, 124, 0.9)',
    selectedState: 'rgba(0,0,0,0.2)',
    unselectedState: 'rgba(228,228,228,0.1)',
    card: 'transparent',
    text: 'transparent',
    border: 'transparent',
    notification: 'transparent',
  },
};

export const customTheme = {
  ...DefaultTheme,
  darkTheme,
  lightTheme,
};

export type CustomTheme = typeof customTheme;

declare module '@react-navigation/native' {
  export function useTheme(): ExtendedTheme;
}
