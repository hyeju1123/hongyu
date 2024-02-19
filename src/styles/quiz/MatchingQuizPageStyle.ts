import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  endQuizContainer: ViewStyle;
  endQuizWrapper: ViewStyle;
  endQuizText: TextStyle;
  largeText: TextStyle;
  smallText: TextStyle;
  timerWrapper: ViewStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.background,
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
  endQuizContainer: {
    zIndex: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.background,
  },
  endQuizWrapper: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.secondary,
  },
  endQuizText: {
    fontFamily: fonts.mainBold,
    color: lightTheme.background,
  },
  largeText: {
    fontSize: 23,
    padding: 10,
  },
  smallText: {
    fontSize: 9,
  },
  timerWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      endQuizText: {
        ...commonPart.endQuizText,
      },
      largeText: {
        fontSize: 18,
        padding: 8,
      },
      smallText: {
        fontSize: 7,
      },
    });
  }
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
