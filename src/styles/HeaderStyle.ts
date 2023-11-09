import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  headerBox: ViewStyle;
  logoImg: ImageStyle;
  inputSection: ViewStyle;
  input: TextStyle;
  pencilWithZhImgWrapper: ViewStyle;
  pencilWithZhImg: ImageStyle;
};

const handleStyles = () => {
  const commonPart: Style = {
    headerBox: {
      display: 'flex',
      alignItems: 'center',
    },
    logoImg: {
      width: 50,
      height: 75,
    },
    inputSection: {
      width: '100%',
      justifyContent: 'center',
    },
    input: {
      fontFamily: fonts.mainBold,
      color: lightTheme.gray,
      paddingLeft: 20,
      paddingRight: 55,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: lightTheme.red,
      borderRadius: 25,
    },
    pencilWithZhImgWrapper: {
      position: 'absolute',
      right: 20,
    },
    pencilWithZhImg: {
      width: 20,
      height: 23,
    },
  };
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
        logoImg: {
          ...commonPart.logoImg,
          width: 100,
          height: 145,
        },
        input: {
          ...commonPart.input,
          fontSize: 20,
          paddingLeft: 30,
          paddingRight: 65,
          paddingVertical: 10,
        },
        pencilWithZhImgWrapper: {
          ...commonPart.pencilWithZhImgWrapper,
          right: 30,
        },
        pencilWithZhImg: {
          width: 25,
          height: 31,
        },
      });
};

const styles = handleStyles();
export default styles;
