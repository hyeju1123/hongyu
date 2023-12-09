import {StyleSheet, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {commonPart as WordDetailStyle} from './WordPageStyle';

type Style = {
  container: ViewStyle;
  flatlist: ViewStyle;
};

const commonPart: Style = {
  ...WordDetailStyle,
  container: {
    ...WordDetailStyle.container,
    backgroundColor: lightTheme.darkRed,
  },
};

const handleStyles = () => {
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
      });
};

const styles = handleStyles();
export default styles;
