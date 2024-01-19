import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {lightTheme} from '../colors';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  word: TextStyle;
  longWord: TextStyle;
  intonation: TextStyle;
  xunyin: TextStyle;
  flexDirRow: ViewStyle;
  wordclassImg: ImageStyle;
  meaning: TextStyle;
  busuSubTitle: TextStyle;
  bookmarkButtonWrapper: ViewStyle;
};

const width = Dimensions.get('screen').width;

export const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.white,
  },
  scrollView: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  word: {
    fontFamily: fonts.hanzi,
    fontSize: width * 0.13,
    color: lightTheme.black,
  },
  longWord: {
    fontFamily: fonts.hanzi,
    fontSize: width * 0.1,
    color: lightTheme.black,
  },
  intonation: {
    fontFamily: fonts.pinyin,
    fontSize: width * 0.04,
    color: lightTheme.darkRed,
    marginTop: 15,
    marginBottom: 8,
  },
  xunyin: {
    fontFamily: fonts.pinyin,
    color: lightTheme.black,
    fontSize: width * 0.03,
  },
  flexDirRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordclassImg: {
    resizeMode: 'stretch',
    width: 52,
    height: 28,
    marginRight: 10,
    marginVertical: 1,
  },
  meaning: {
    width: '95%',
    fontFamily: fonts.pinyin,
    fontSize: width * 0.035,
    color: lightTheme.black,
    margin: 5,
  },
  busuSubTitle: {
    fontFamily: fonts.mainBold,
    fontSize: width * 0.035,
    color: lightTheme.darkRed,
    marginBottom: width * 0.02,
    alignSelf: 'flex-start',
  },
  bookmarkButtonWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
};

export const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
