import {StyleSheet, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {DisplaySize, getDisplaySize} from '../screen';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  line: ViewStyle;
};

export const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.white,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
  line: {
    width: '10%',
    height: 3,
    alignSelf: 'center',
    backgroundColor: lightTheme.darkRed,
    borderRadius: 100,
    marginVertical: 10,
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
