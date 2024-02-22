import {StyleSheet, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';

type Style = {
  container: ViewStyle;
  flashlistContent: ViewStyle;
  modalBack: ViewStyle;
  quizModalButton: ViewStyle;
};

export const commonPart: Style = {
  container: {
    flex: 1,
  },
  flashlistContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  modalBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  quizModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 5,
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
