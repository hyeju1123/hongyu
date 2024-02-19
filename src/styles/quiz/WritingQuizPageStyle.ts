import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  scrollViewContent: ViewStyle;
  infoContainer: ViewStyle;
  infoWrapper: ViewStyle;
  serviceButtonWrapper: ViewStyle;
  guideText: TextStyle;
  dirRow: ViewStyle;
  hanzi: TextStyle;
  intonation: TextStyle;
  meaning: TextStyle;
  buttonWrapper: ViewStyle;
  svgWrapper: ViewStyle;
  moveButtonWrapper: ViewStyle;
  horizonFlip: ViewStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.background,
  },
  scrollViewContent: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '40%',
    width: '100%',
    padding: 15,
  },
  infoWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    bottom: 0,
  },
  serviceButtonWrapper: {
    minWidth: 27,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
  guideText: {
    fontFamily: fonts.pinyin,
    fontSize: 13,
    color: lightTheme.textPrimary,
  },
  dirRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: '25%',
  },
  hanzi: {
    fontFamily: fonts.hanzi,
    fontSize: 30,
    color: lightTheme.textPrimary,
  },
  intonation: {
    fontFamily: fonts.pinyin,
    fontSize: 15,
    color: lightTheme.primary,
  },
  meaning: {
    width: width * 0.6,
    textAlign: 'center',
    fontFamily: fonts.hanzi,
    fontSize: 14,
    color: lightTheme.textPrimary,
  },
  buttonWrapper: {
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  svgWrapper: {
    margin: 5,
  },
  moveButtonWrapper: {
    padding: 20,
  },
  horizonFlip: {
    transform: [{rotateY: '180deg'}],
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      hanzi: {
        ...commonPart.hanzi,
        fontSize: 17,
      },
      intonation: {
        ...commonPart.intonation,
        fontSize: 10,
      },
      meaning: {
        ...commonPart.meaning,
        fontSize: 10,
      },
      guideText: {
        ...commonPart.guideText,
        fontSize: 10,
      },
      serviceButtonWrapper: {
        ...commonPart.serviceButtonWrapper,
        minWidth: 20,
      },
    });
  }
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
