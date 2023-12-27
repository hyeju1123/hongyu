import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  container: ViewStyle;
  preview: ViewStyle;
  imgWrapper: ViewStyle;
  img: ImageStyle;
  hanzi: TextStyle;
  longHanzi: TextStyle;
  button: ViewStyle;
  tmoneyText: TextStyle;
  pinyin: TextStyle;
  meaning: TextStyle;
};

export const commonPart: Style = {
  container: {
    padding: 15,
    backgroundColor: lightTheme.white,
    borderRadius: 10,
  },
  preview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgWrapper: {
    padding: 5,
    alignSelf: 'flex-start',
  },
  img: {
    width: 23,
    height: 23,
  },
  hanzi: {
    fontFamily: fonts.hanzi,
    fontSize: 45,
    color: lightTheme.black,
    marginBottom: 10,
  },
  longHanzi: {
    fontFamily: fonts.hanzi,
    fontSize: 35,
    color: lightTheme.black,
    marginBottom: 10,
  },
  button: {
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
  },
  tmoneyText: {
    fontFamily: fonts.pinyin,
    fontSize: 20,
    color: lightTheme.white,
  },
  pinyin: {
    fontFamily: fonts.pinyin,
    fontSize: 15,
    color: lightTheme.gray,
  },
  meaning: {
    fontFamily: fonts.main,
    fontSize: 15,
    textAlign: 'center',
    color: lightTheme.black,
    lineHeight: 27,
    marginTop: 5,
    marginBottom: -3,
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
