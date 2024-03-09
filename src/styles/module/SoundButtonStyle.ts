import {StyleSheet, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';

type Style = {
  button: ViewStyle;
  alignCenter: ViewStyle;
  smallVer: ViewStyle;
  largeVer: ViewStyle;
};

const commonPart: Style = {
  button: {
    alignSelf: 'flex-start',
    padding: 5,
  },
  alignCenter: {
    alignSelf: 'center',
  },
  smallVer: {
    width: 23,
  },
  largeVer: {
    width: 50,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      smallVer: {
        width: 16,
      },
      largeVer: {
        width: 30,
      },
    });
  }
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      smallVer: {
        width: 24,
      },
      largeVer: {
        width: 50,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
