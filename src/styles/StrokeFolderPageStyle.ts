import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {DisplaySize, getDisplaySize} from './screen';
import {handleStyles as CategoryStyleHandler} from './CategoryPageStyle';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  text: TextStyle;
  bottomText: TextStyle;
  bottomRedText: TextStyle;
};

const CategoryStyle = CategoryStyleHandler();

const commonPart: Style = {
  ...CategoryStyle,
  container: {
    ...CategoryStyle.container,
    backgroundColor: lightTheme.darkRed,
  },
  bottomRedText: {
    ...CategoryStyle.bottomRedText,
    color: lightTheme.darkRed,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      scrollView: {
        ...commonPart.scrollView,
        marginHorizontal: 35,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
