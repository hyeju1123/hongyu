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
    primary: '#D14124', // primary
    secondary: '#AA351D', // secondary
    background: '#FFFFFF', // background
    shadow: '#BEBEBE', // shadow
    deepShadow: '#8E8E8E', // deepShadow
    ongoingState: '#E4E4E4', // ongoingState
    cardBorderLine: '#E4E4E4', // cardBorderLine
    contentBackground: '#F3F1EE', // contentBackground
    textPrimary: '#655858', // textPrimary
    textSecondary: '#FFFFFF', // textSecondary
    mildHealthy: '#E8FAEA', // mildHealthy
    mildWarning: '#FFF4CE', // mildWarning
    healthy: '#6BBF59', // healthy
    warning: '#FFC048', // warning
    iconPrimary: '#D14124',
    transparent: 'transparent', // transparent
    transparentBack: 'rgba(255,255,255,0.5)', // transparentBack
    transparentContentBack: 'rgba(243, 241, 238, 0.9)', // transparentContentBack
    selectedState: 'rgba(0,0,0,0.2)', // selectedState
    unselectedState: 'rgba(228,228,228,0.3)', // unselectedState
    card: 'transparent',
    text: 'transparent',
    border: 'transparent',
    notification: 'transparent',
  },
};

export const darkTheme: ExtendedTheme = {
  dark: true,
  colors: {
    primary: '#0F1114', // primary
    secondary: '#1E2022', // secondary
    background: '#282C35', // background
    shadow: '#0F1114', // shadow
    deepShadow: '#E4E4E4', // deepShadow
    ongoingState: '#8E8E8E', // ongoingState
    cardBorderLine: '#1E2022', // cardBorderLine
    contentBackground: '#6E727C', // contentBackground
    textPrimary: '#D3D4D4', // textPrimary
    textSecondary: '#D3D4D4', // textSecondary
    mildHealthy: '#94A095', // mildHealthy
    mildWarning: '#B9B09F', // mildWarning
    healthy: '#4A853E', // healthy
    warning: '#CC9939', // warning
    iconPrimary: '#D3D4D4',
    transparent: 'transparent', // transparent
    transparentBack: 'rgba(255,255,255,0.5)', // transparentBack
    transparentContentBack: 'rgba(110, 114, 124, 0.9)', // transparentContentBack
    selectedState: 'rgba(0,0,0,0.2)', // selectedState
    unselectedState: 'rgba(228,228,228,0.1)', // unselectedState
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
