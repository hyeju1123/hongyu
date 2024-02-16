import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';

type Style = {
  buttonWrapper: ViewStyle;
  small: ImageStyle;
  large: ImageStyle;
};

const commonPart: Style = {
  buttonWrapper: {
    padding: 5,
  },
  small: {
    width: 20,
    height: 20,
  },
  large: {
    width: 45,
    height: 45,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      large: {
        width: 30,
        height: 30,
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
