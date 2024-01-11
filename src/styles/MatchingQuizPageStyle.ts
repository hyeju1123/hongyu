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
  endQuizWrapper: ViewStyle;
  endQuizText: TextStyle;
  largeText: TextStyle;
  smallText: TextStyle;
  dumplingIcon: ImageStyle;
  timerWrapper: ViewStyle;
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
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    display: 'flex',
    alignItems: 'center',
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      scrollView: {
        marginHorizontal: 35,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
