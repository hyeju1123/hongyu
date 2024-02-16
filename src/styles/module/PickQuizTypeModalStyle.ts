import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  modal: ViewStyle;
  scrollView: ViewStyle;
  buttonWrapper: ViewStyle;
  closeButton: ViewStyle;
  guideText: TextStyle;
};

const width = Dimensions.get('screen').width;

export const commonPart: Style = {
  modal: {
    position: 'absolute',
    width: '100%',
    height: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.transOatmeal,
    bottom: 0,
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  scrollView: {
    width: '100%',
  },
  buttonWrapper: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    padding: 20,
    top: 0,
    right: 0,
  },
  guideText: {
    marginHorizontal: width * 0.05,
    marginVertical: width * 0.05,
    marginBottom: width * 0.02,
    fontFamily: fonts.mainBold,
    fontSize: 18,
    color: lightTheme.black,
  },
};

export const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      guideText: {
        ...commonPart.guideText,
        fontSize: 13,
      },
    });
  }
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
