import {StyleSheet, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {DisplaySize, getDisplaySize} from './screen';

type Style = {
  container: ViewStyle;
};
export const commonPart: Style = {
  container: {
    backgroundColor: lightTheme.white,
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      container: {
        ...commonPart.container,
        padding: 13,
        marginVertical: 10,
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
