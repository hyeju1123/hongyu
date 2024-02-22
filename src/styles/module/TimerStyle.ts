import {Dimensions, StyleSheet, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';

type Style = {
  container: ViewStyle;
  bottomBar: ViewStyle;
  line: ViewStyle;
  icon: ViewStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  container: {
    marginVertical: 10,
  },
  bottomBar: {
    width: width * 0.8,
    height: 5,
    borderRadius: 5,
  },
  line: {
    top: 0,
    position: 'absolute',
    width: width,
    zIndex: 10,
    height: 5,
  },
  icon: {
    width: 20,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      icon: {
        width: 25,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      icon: {
        width: 25,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
