import {Dimensions, ImageStyle, StyleSheet, ViewStyle} from 'react-native';

import {isPhone} from './screen';

type Style = {
  completeBtn: ViewStyle;
  completeImg: ImageStyle;
};

const width = Dimensions.get('screen').width;

const handleStyles = () => {
  const commonPart: Style = {
    completeBtn: {
      position: 'absolute',
      right: 20,
    },
    completeImg: {
      width: width * 0.035,
      height: width * 0.035,
    },
  };
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
      });
};

const styles = handleStyles();
export default styles;
