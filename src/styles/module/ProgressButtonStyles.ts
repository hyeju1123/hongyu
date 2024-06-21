import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {fonts} from '../fonts';

type Style = {
  dot: ViewStyle;
  button: ViewStyle;
  text: TextStyle;
};

const commonPart: Style = {
  dot: {
    marginTop: 3,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 13,
  },
  text: {
    fontSize: 10,
    fontFamily: fonts.pinyin,
  },
};

const handleStyles = () => {
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
