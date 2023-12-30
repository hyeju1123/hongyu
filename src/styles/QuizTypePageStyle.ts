import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  container: ViewStyle;
  guideText: TextStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.darkRed,
  },
  guideText: {
    paddingHorizontal: 20,
    paddingTop: 50,
    fontFamily: fonts.mainBold,
    fontSize: width * 0.05,
    color: lightTheme.white,
  },
};

const handleStyles = () => {
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
        scrollView: {
          marginHorizontal: 35,
        },
      });
};

const styles = handleStyles();
export default styles;
