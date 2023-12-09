import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  headerBox: ViewStyle;
  logoImg: ImageStyle;
  inputSection: ViewStyle;
  text: TextStyle;
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
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: lightTheme.red,
      borderRadius: 25,
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    text: {
      fontFamily: fonts.mainBold,
      color: lightTheme.ligthGray,
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
        text: {
          ...commonPart.text,
          fontSize: 20,
          paddingLeft: 30,
          paddingRight: 65,
          paddingVertical: 10,
        },
        pencilWithZhImg: {
          width: 25,
          height: 31,
        },
      });
};

const styles = handleStyles();
export default styles;
