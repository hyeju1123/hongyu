import {StyleSheet, ViewStyle} from 'react-native';
import {getDisplaySize, DisplaySize} from '../screen';

type Style = {
  card: ViewStyle;
  underdressing: ViewStyle;
  flexRow: ViewStyle;
  shadow: ViewStyle;
};

const commonPart: Style = {
  card: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  underdressing: {
    borderRadius: 10,
    paddingBottom: 3,
  },
  flexRow: {
    flexDirection: 'row',
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      card: {
        ...commonPart.card,
        padding: 8,
        borderRadius: 10,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
