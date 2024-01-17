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
  editImg: ImageStyle;
  bookmarkButtonWrapper: ViewStyle;
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
    fontSize: width * 0.13,
    color: lightTheme.black,
    marginTop: 15,
  },
  longWord: {
    fontFamily: fonts.hanzi,
    fontSize: width * 0.1,
    color: lightTheme.black,
    marginTop: 15,
  },
  intonation: {
    fontFamily: fonts.pinyin,
    fontSize: width * 0.04,
    color: lightTheme.red,
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
    width: '100%',
    fontFamily: fonts.pinyin,
    fontSize: width * 0.035,
    color: lightTheme.black,
    alignSelf: 'flex-start',
  },
  editImg: {
    width: width * 0.045,
    height: width * 0.045,
  },
  bookmarkButtonWrapper: {
    flex: 1,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
};

export const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      word: {
        ...commonPart.word,
        fontSize: 35,
      },
      intonation: {
        ...commonPart.intonation,
        fontSize: 13,
      },
      sound: {
        ...commonPart.sound,
        width: 20,
        height: 20,
      },
      wordclassImg: {
        ...commonPart.wordclassImg,
        width: 50,
        height: 27,
      },
      meaning: {
        ...commonPart.meaning,
        fontSize: 13,
      },
      bookmarkImg: {
        width: 40,
        height: 40,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      scrollView: {
        ...commonPart.scrollView,
        marginHorizontal: 35,
      },
      word: {
        ...commonPart.word,
        fontSize: width * 0.1,
      },
      intonation: {
        ...commonPart.intonation,
        fontSize: width * 0.03,
      },
      soundButton: {
        ...commonPart.soundButton,
        top: width * 0.02,
        right: width * 0.025,
      },
      sound: {
        ...commonPart.sound,
        width: width * 0.04,
        height: width * 0.04,
      },
      meaning: {
        ...commonPart.meaning,
        fontSize: width * 0.03,
      },
      bookmarkImg: {
        width: width * 0.08,
        height: width * 0.08,
      },
      editImg: {
        width: width * 0.03,
        height: width * 0.03,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
