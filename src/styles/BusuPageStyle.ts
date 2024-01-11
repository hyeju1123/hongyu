import {StyleSheet, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {handleStyles as WordDetailStyleHandler} from './WordPageStyle';

type Style = {
  container: ViewStyle;
  flatlist: ViewStyle;
};

const WordDetailStyle = WordDetailStyleHandler();

const commonPart: Style = {
  ...WordDetailStyle,
  container: {
    ...WordDetailStyle.container,
    backgroundColor: lightTheme.darkRed,
  },
};

const handleStyles = () => {
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
