import {StyleSheet, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {DisplaySize, getDisplaySize} from './screen';

type Style = {
  container: ViewStyle;
  flatlist: ViewStyle;
  flatlistContent: ViewStyle;
};

export const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.red,
  },
  flatlist: {
    marginHorizontal: 20,
  },
  flatlistContent: {
    paddingBottom: 10,
    flexGrow: 1,
  },
};

export const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      flatlist: {
        marginHorizontal: 35,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
