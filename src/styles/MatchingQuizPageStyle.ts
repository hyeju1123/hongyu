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
  endQuizWrapper: ViewStyle;
  endQuizText: TextStyle;
  largeText: TextStyle;
  smallText: TextStyle;
  dumplingIcon: ImageStyle;
  timerWrapper: ViewStyle;
  guideText: TextStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.darkRed,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  endQuizWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: lightTheme.darkRed,
  },
  endQuizText: {
    padding: 10,
    fontFamily: fonts.mainBold,
    color: lightTheme.white,
  },
  largeText: {
    fontSize: width * 0.08,
  },
  smallText: {
    fontSize: width * 0.04,
  },
  dumplingIcon: {
    width: width * 0.3,
    height: width * 0.3,
  },
  timerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
  },
  guideText: {
    textAlign: 'center',
    fontFamily: fonts.main,
    fontSize: width * 0.05,
    color: lightTheme.white,
    marginVertical: 20,
  },
};

const handleStyles = () => {
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
        scrollView: {
          marginHorizontal: 35,
        },
      });
};

const styles = handleStyles();
export default styles;
