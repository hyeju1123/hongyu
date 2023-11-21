import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  word: TextStyle;
  intonation: TextStyle;
  rowWrapper: ViewStyle;
  wordclassImg: ImageStyle;
  meaning: TextStyle;
  editBtn: ViewStyle;
  editImg: ImageStyle;
  bookmarkBtn: ViewStyle;
  bookmarkImg: ImageStyle;
};

const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.red,
  },
  scrollView: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  word: {
    fontFamily: fonts.hanzi,
    fontSize: 75,
    color: lightTheme.black,
    textAlign: 'center',
  },
  intonation: {
    fontFamily: fonts.pinyin,
    fontSize: 25,
    color: lightTheme.red,
    textAlign: 'center',
    marginTop: 20,
  },
  rowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordclassImg: {
    resizeMode: 'stretch',
    width: 65,
    height: 35,
    marginRight: 10,
    marginVertical: 1,
  },
  meaning: {
    fontFamily: fonts.mainBold,
    fontSize: 20,
    color: lightTheme.black,
    lineHeight: 28,
    padding: 0,
  },
  editBtn: {
    position: 'absolute',
    right: 20,
  },
  editImg: {
    width: 25,
    height: 25,
  },
  bookmarkBtn: {
    marginTop: 85,
    marginBottom: 30,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  bookmarkImg: {
    width: 50,
    height: 50,
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
