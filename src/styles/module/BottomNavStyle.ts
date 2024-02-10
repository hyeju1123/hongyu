import {StyleSheet, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';

type Style = {
  bottomNav: ViewStyle;
  horizonFlip: ViewStyle;
};

const commonPart: Style = {
  bottomNav: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  horizonFlip: {
    transform: [{rotateY: '180deg'}],
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
