import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  text: TextStyle;
  bottomText: TextStyle;
  bottomRedText: TextStyle;
};

export const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.red,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    fontFamily: fonts.mainBold,
    color: lightTheme.black,
    fontSize: 25,
    marginVertical: 10,
    alignSelf: 'center',
  },
  bottomText: {
    fontFamily: fonts.mainBold,
    color: lightTheme.shadowGray,
    fontSize: 13,
    alignSelf: 'center',
  },
  bottomRedText: {
    color: lightTheme.red,
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
