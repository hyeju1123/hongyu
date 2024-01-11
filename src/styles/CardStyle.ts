import {StyleSheet, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {getDisplaySize, DisplaySize} from './screen';

type Style = {
  card: ViewStyle;
  shdaow: ViewStyle;
  noShadow: ViewStyle;
  flexRow: ViewStyle;
  backgroundRed: ViewStyle;
  shadowForRed: ViewStyle;
};

const commonPart: Style = {
  card: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.white,
    borderRadius: 8,
    padding: 10,
  },
  shdaow: {
    backgroundColor: lightTheme.shadowGray,
    borderRadius: 8,
    paddingBottom: 3,
  },
  noShadow: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  flexRow: {
    flexDirection: 'row',
  },
  backgroundRed: {
    backgroundColor: lightTheme.red,
  },
  shadowForRed: {
    backgroundColor: lightTheme.darkRed,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      card: {
        ...commonPart.card,
        padding: 5,
      },
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
