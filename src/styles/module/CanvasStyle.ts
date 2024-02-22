import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  canvasBackground: ViewStyle;
  canvas: ViewStyle;
  backHanziWrapper: ViewStyle;
  buttonWrapper: ViewStyle;
  resetButton: ViewStyle;
  resetButtonText: TextStyle;
  shadow: ViewStyle;
  auxiliaryLine: ViewStyle;
  horizonLine: ViewStyle;
  verticalLine: ViewStyle;
  writingReset: ViewStyle;
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
  },
  canvas: {
    width: width,
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
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  resetButton: {
    borderRadius: 10,
    alignSelf: 'flex-start',
    padding: 10,
    margin: 10,
  },
  resetButtonText: {
    fontFamily: fonts.hanzi,
    fontSize: 13,
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
  },
  horizonLine: {
    width: '100%',
    borderTopWidth: 1,
  },
  verticalLine: {
    height: '100%',
    borderRightWidth: 1,
  },
  writingReset: {
    width: 20,
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
      writingReset: {
        width: 13,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      writingReset: {
        width: 20,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
