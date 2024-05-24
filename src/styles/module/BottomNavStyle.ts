import {StyleSheet, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';

type Style = {
  bottomNav: ViewStyle;
  smallSize: ViewStyle;
  horizonFlip: ViewStyle;
  playButtonPadding: ViewStyle;
  smallVerPlay: ViewStyle;
  largeVerPlay: ViewStyle;
};

const commonPart: Style = {
  bottomNav: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  smallSize: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    paddingVertical: 10,
  },
  horizonFlip: {
    transform: [{rotateY: '180deg'}],
  },
  playButtonPadding: {
    padding: 8,
  },
  smallVerPlay: {
    width: 25,
  },
  largeVerPlay: {
    width: 45,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      playButtonPadding: {
        padding: 10,
      },
      smallVerPlay: {
        width: 25,
      },
      largeVerPlay: {
        width: 45,
      },
    });
  }
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      smallVerPlay: {
        width: 20,
      },
      largeVerPlay: {
        width: 35,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
