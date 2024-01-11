import {Dimensions, ImageStyle, StyleSheet, ViewStyle} from 'react-native';

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
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
