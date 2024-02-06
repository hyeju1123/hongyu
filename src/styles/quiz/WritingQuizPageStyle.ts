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
  horizonFlip: ViewStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.white,
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
    padding: 10,
  },
  infoWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    bottom: 0,
  },
  serviceButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  guideText: {
    fontFamily: fonts.hanzi,
    fontSize: width * 0.035,
    color: lightTheme.black,
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
    color: lightTheme.black,
  },
  intonation: {
    fontFamily: fonts.pinyin,
    fontSize: width * 0.04,
    color: lightTheme.red,
  },
  meaning: {
    width: width * 0.6,
    textAlign: 'center',
    fontFamily: fonts.hanzi,
    fontSize: width * 0.04,
    color: lightTheme.black,
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
  horizonFlip: {
    transform: [{rotateY: '180deg'}],
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
