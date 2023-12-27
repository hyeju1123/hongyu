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
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  word: TextStyle;
  longWord: TextStyle;
  intonation: TextStyle;
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
  container: {
    flex: 1,
    backgroundColor: lightTheme.red,
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
    fontSize: width * 0.15,
    color: lightTheme.black,
    textAlign: 'center',
    marginTop: 15,
  },
  longWord: {
    fontFamily: fonts.hanzi,
    fontSize: width * 0.12,
    color: lightTheme.black,
    textAlign: 'center',
    marginTop: 15,
  },
  intonation: {
    fontFamily: fonts.pinyin,
    fontSize: width * 0.05,
    color: lightTheme.red,
    textAlign: 'center',
    marginTop: 20,
  },
  soundButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  sound: {
    width: 25,
    height: 25,
    transform: [{rotate: '180deg'}],
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
    width: width * 0.045,
    height: width * 0.045,
  },
  bookmarkBtn: {
    flex: 1,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  bookmarkImg: {
    width: 50,
    height: 50,
  },
  limitText: {
    alignSelf: 'flex-end',
    fontFamily: fonts.main,
    fontSize: width * 0.03,
    marginTop: 5,
    marginBottom: -1 * width * 0.03,
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
