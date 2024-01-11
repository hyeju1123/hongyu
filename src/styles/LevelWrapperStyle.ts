import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {fonts} from './fonts';

type Style = {
  wrapper: ViewStyle;
  title: TextStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  wrapper: {
    position: 'absolute',
    height: width * 0.8,
    display: 'flex',
    padding: 20,
  },
  title: {
    fontFamily: fonts.mainBold,
    color: lightTheme.white,
    margin: 3,
  },
};

const handleStyles = () => {
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
