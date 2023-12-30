import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  icon: ImageStyle;
  typeTextWrapper: ViewStyle;
  typeButton: ViewStyle;
  justifyContent: ViewStyle;
  title: TextStyle;
  desc: TextStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  typeTextWrapper: {
    flex: 1,
    margin: 15,
    display: 'flex',
    justifyContent: 'space-between',
  },
  justifyContent: {
    justifyContent: 'center',
  },
  typeButton: {
    width: '100%',
  },
  icon: {
    width: width * 0.1,
    height: width * 0.1,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  title: {
    fontFamily: fonts.mainBold,
    color: lightTheme.black,
    fontSize: width * 0.035,
  },
  desc: {
    fontFamily: fonts.pinyin,
    color: lightTheme.gray,
    fontSize: width * 0.025,
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
