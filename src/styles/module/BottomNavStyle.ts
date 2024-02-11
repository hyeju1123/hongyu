import {StyleSheet, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';

type Style = {
  bottomNav: ViewStyle;
  smallSize: ViewStyle;
  horizonFlip: ViewStyle;
};

const commonPart: Style = {
  bottomNav: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 40,
  },
  smallSize: {
    position: 'absolute',
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
