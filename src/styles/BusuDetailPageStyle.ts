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
import {commonPart as WordDetailPageStyle} from './WordDetailPageStyle';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  word: TextStyle;
  longWord: TextStyle;
  xunyin: TextStyle;
  intonation: TextStyle;
  infoTitleText: TextStyle;
  infoText: TextStyle;
  soundButton: ViewStyle;
  sound: ImageStyle;
  rowWrapper: ViewStyle;
  wordclassImg: ImageStyle;
  meaning: TextStyle;
  editBtn: ViewStyle;
  editImg: ImageStyle;
  bookmarkBtn: ViewStyle;
  bookmarkImg: ImageStyle;
  limitText: TextStyle;
};

const width = Dimensions.get('screen').width;

export const commonPart: Style = {
  ...WordDetailPageStyle,
  container: {
    ...WordDetailPageStyle.container,
    backgroundColor: lightTheme.darkRed,
  },
  word: {
    ...WordDetailPageStyle.word,
    marginTop: 0,
  },
  longWord: {
    ...WordDetailPageStyle.word,
    fontSize: width * 0.1,
    marginTop: 0,
  },
  xunyin: {
    textAlign: 'center',
    fontFamily: fonts.pinyin,
    color: lightTheme.black,
    fontSize: width * 0.03,
    marginTop: width * 0.03,
  },
  intonation: {
    ...WordDetailPageStyle.intonation,
    fontSize: width * 0.04,
    color: lightTheme.darkRed,
    marginTop: 0,
  },
  infoTitleText: {
    fontFamily: fonts.mainBold,
    fontSize: width * 0.04,
    color: lightTheme.darkRed,
    marginBottom: width * 0.02,
  },
  infoText: {
    fontFamily: fonts.mainBold,
    fontSize: width * 0.04,
    color: lightTheme.black,
    lineHeight: width * 0.055,
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
