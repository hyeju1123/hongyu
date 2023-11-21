import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  container: ViewStyle;
  checkedImage: ImageStyle;
  closeImage: ImageStyle;
  text: TextStyle;
};

const commonPart: Style = {
  container: {
    display: 'flex',
    position: 'absolute',
    marginTop: 100,
    backgroundColor: lightTheme.white,
    alignSelf: 'center',
    minWidth: '65%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 10,
  },
  checkedImage: {
    width: 13,
    height: 13,
  },
  closeImage: {
    width: 8,
    height: 8,
  },
  text: {
    flex: 1,
    marginHorizontal: 5,
    fontFamily: fonts.mainBold,
    fontSize: 10,
    color: lightTheme.black,
  },
};

const handleStyles = () => {
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
      });
};

const styles = handleStyles();
export default styles;
