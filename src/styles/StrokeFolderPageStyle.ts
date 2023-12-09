import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {commonPart as CategoryStyle} from './CategoryPageStyle';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  text: TextStyle;
  bottomText: TextStyle;
  bottomRedText: TextStyle;
};

const commonPart: Style = {
  ...CategoryStyle,
  container: {
    ...CategoryStyle.container,
    backgroundColor: lightTheme.darkRed,
  },
  bottomRedText: {
    ...CategoryStyle.bottomRedText,
    color: lightTheme.darkRed,
  },
};

const handleStyles = () => {
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
        scrollView: {
          ...commonPart.scrollView,
          marginHorizontal: 35,
        },
      });
};

const styles = handleStyles();
export default styles;
