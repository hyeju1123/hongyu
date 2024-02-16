import {StyleSheet, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {getDisplaySize, DisplaySize} from '../screen';

type Style = {
  card: ViewStyle;
  underdressing: ViewStyle;
  noUnderdressing: ViewStyle;
  flexRow: ViewStyle;
  backgroundRed: ViewStyle;
  redUnderdressing: ViewStyle;
  shadow: ViewStyle;
};

const commonPart: Style = {
  card: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: lightTheme.ligthGray,
  },
  underdressing: {
    backgroundColor: lightTheme.shadowGray,
    borderRadius: 10,
    paddingBottom: 3,
  },
  noUnderdressing: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  flexRow: {
    flexDirection: 'row',
  },
  backgroundRed: {
    backgroundColor: lightTheme.red,
  },
  redUnderdressing: {
    backgroundColor: lightTheme.darkRed,
  },
  shadow: {
    shadowColor: lightTheme.shadowGray,
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
