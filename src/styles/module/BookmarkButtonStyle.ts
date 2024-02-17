import {StyleSheet, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';

type Style = {
  buttonWrapper: ViewStyle;
};

const commonPart: Style = {
  buttonWrapper: {
    padding: 5,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
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
