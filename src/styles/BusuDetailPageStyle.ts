import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {lightTheme} from './colors';
import {DisplaySize, getDisplaySize} from './screen';
import {fonts} from './fonts';
import {handleStyles as WordDetailPageStyleHandler} from './WordDetailPageStyle';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  word: TextStyle;
  longWord: TextStyle;
  xunyin: TextStyle;
  intonation: TextStyle;
  meaning: TextStyle;
  infoTitleText: TextStyle;
  bookmarkBtn: ViewStyle;
  bookmarkImg: ImageStyle;
};

const width = Dimensions.get('screen').width;
const WordDetailPageStyle = WordDetailPageStyleHandler();

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
    color: lightTheme.darkRed,
    marginTop: 0,
  },
  infoTitleText: {
    fontFamily: fonts.mainBold,
    fontSize: width * 0.04,
    color: lightTheme.darkRed,
    marginBottom: width * 0.02,
    alignSelf: 'flex-start',
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      infoTitleText: {
        ...commonPart.infoTitleText,
        fontSize: width * 0.03,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
