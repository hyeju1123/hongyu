import {StyleSheet, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
};

const handleStyles = () => {
  const commonPart: Style = {
    container: {
      flex: 1,
      backgroundColor: lightTheme.white,
    },
    scrollView: {
      marginHorizontal: 20,
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
  };
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
        scrollView: {
          ...commonPart.scrollView,
          marginHorizontal: 35,
        },
      });
};

const styles = handleStyles();
export default styles;
