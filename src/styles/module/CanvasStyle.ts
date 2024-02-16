import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {lightTheme} from '../colors';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  canvasBackground: ViewStyle;
  canvas: ViewStyle;
  backHanziWrapper: ViewStyle;
  backHanzi: TextStyle;
  buttonWrapper: ViewStyle;
  resetButton: ViewStyle;
  resetButtonText: TextStyle;
  shadow: ViewStyle;
  auxiliaryLine: ViewStyle;
  horizonLine: ViewStyle;
  verticalLine: ViewStyle;
};

const width = Dimensions.get('screen').width;
const bottomBarHeight =
  Dimensions.get('screen').height -
  Dimensions.get('window').height -
  (StatusBar.currentHeight || 0);

const commonPart: Style = {
  canvasBackground: {
    width: '100%',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: lightTheme.oatmeal,
  },
  canvas: {
    width: width,
    backgroundColor: lightTheme.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  backHanziWrapper: {
    position: 'absolute',
    top: 0,
    bottom: bottomBarHeight,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backHanzi: {
    fontFamily: fonts.hanzi,
    color: lightTheme.ligthGray,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  resetButton: {
    backgroundColor: lightTheme.white,
    borderRadius: 10,
    alignSelf: 'flex-start',
    padding: 10,
    margin: 10,
  },
  resetButtonText: {
    fontFamily: fonts.hanzi,
    fontSize: 13,
    color: lightTheme.red,
    marginLeft: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  auxiliaryLine: {
    position: 'absolute',
    borderStyle: 'dashed',
    borderColor: lightTheme.ligthGray,
  },
  horizonLine: {
    width: '100%',
    borderTopWidth: 1,
  },
  verticalLine: {
    height: '100%',
    borderRightWidth: 1,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      resetButton: {
        ...commonPart.resetButton,
        borderRadius: 5,
        padding: 5,
        margin: 7,
      },
      resetButtonText: {
        ...commonPart.resetButtonText,
        fontSize: 8,
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
