import {StyleSheet, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';
import {lightTheme} from '../colors';

type Style = {
  cardWrapper: ViewStyle;
  flashlistContent: ViewStyle;
};

const commonPart: Style = {
  cardWrapper: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: lightTheme.shadowGray,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 7,
    flex: 1,
    top: 10,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: lightTheme.white,
  },
  flashlistContent: {
    paddingBottom: 10,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      cardWrapper: {
        ...commonPart.cardWrapper,
        top: 3,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      cardWrapper: {
        ...commonPart.cardWrapper,
        paddingTop: 30,
        paddingHorizontal: 30,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
