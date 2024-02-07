import {StyleSheet, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {DisplaySize, getDisplaySize} from '../screen';

type Style = {
  container: ViewStyle;
  flashlistContent: ViewStyle;
  modalBack: ViewStyle;
};

export const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.white,
  },
  flashlistContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  modalBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
};

export const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
