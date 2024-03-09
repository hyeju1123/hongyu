import {StyleSheet, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';

type Style = {
  buttonWrapper: ViewStyle;
  smallVer: ViewStyle;
  largeVer: ViewStyle;
};

const commonPart: Style = {
  buttonWrapper: {
    padding: 5,
  },
  smallVer: {
    width: 23,
  },
  largeVer: {
    width: 45,
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
        width: 35,
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
        width: 45,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
