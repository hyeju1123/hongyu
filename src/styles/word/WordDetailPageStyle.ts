import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
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
  classIconWrapper: ViewStyle;
  classIconText: TextStyle;
  meaning: TextStyle;
  busuSubTitle: TextStyle;
  bookmarkButtonWrapper: ViewStyle;
};

export const commonPart: Style = {
  container: {
    flex: 1,
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
    fontSize: 50,
  },
  longWord: {
    fontFamily: fonts.hanzi,
    fontSize: 38,
  },
  intonation: {
    fontFamily: fonts.pinyin,
    fontSize: 15,
    marginTop: 15,
    marginBottom: 8,
  },
  xunyin: {
    fontFamily: fonts.pinyin,
    fontSize: 12,
  },
  flexDirRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  classIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 27,
    marginRight: 10,
    marginVertical: 1,
    borderRadius: 5,
  },
  classIconText: {
    fontFamily: fonts.mainBold,
    fontSize: 15,
  },
  meaning: {
    width: '95%',
    fontFamily: fonts.pinyin,
    fontSize: 13,
    margin: 5,
  },
  busuSubTitle: {
    fontFamily: fonts.mainBold,
    fontSize: 13,
    margin: 3,
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
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      word: {
        ...commonPart.word,
        fontSize: 30,
      },
      longWord: {
        ...commonPart.longWord,
        fontSize: 22,
      },
      intonation: {
        ...commonPart.intonation,
        marginTop: 10,
        marginBottom: 4,
        fontSize: 11,
      },
      xunyin: {
        ...commonPart.xunyin,
        fontSize: 10,
      },
      meaning: {
        ...commonPart.meaning,
        fontSize: 11,
      },
      busuSubTitle: {
        ...commonPart.busuSubTitle,
        fontSize: 11,
      },
      classIconWrapper: {
        ...commonPart.classIconWrapper,
        width: 40,
        height: 20,
        marginRight: 6,
      },
      classIconText: {
        ...commonPart.classIconText,
        fontSize: 11,
      },
    });
  }
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      word: {
        ...commonPart.word,
        fontSize: 45,
      },
      longWord: {
        ...commonPart.longWord,
        fontSize: 40,
      },
      intonation: {
        ...commonPart.intonation,
        fontSize: 18,
      },
      xunyin: {
        ...commonPart.xunyin,
        fontSize: 17,
        marginBottom: 5,
      },
      meaning: {
        ...commonPart.meaning,
        fontSize: 16,
      },
      busuSubTitle: {
        ...commonPart.busuSubTitle,
        fontSize: 17,
        margin: 10,
        marginBottom: 5,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
