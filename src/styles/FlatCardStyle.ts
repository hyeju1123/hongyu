import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  card: ViewStyle;
  img: ImageStyle;
  arrow: ImageStyle;
  textWrapper: ViewStyle;
  title: TextStyle;
  desc: TextStyle;
};

const width = Dimensions.get('screen').width;

const handleStyles = () => {
  const commonPart: Style = {
    card: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: lightTheme.darkRed,
      borderRadius: 8,
      padding: 10,
      marginVertical: 5,
    },
    img: {
      width: width * 0.4,
      height: width * 0.24,
    },
    textWrapper: {
      flex: 1,
    },
    arrow: {
      width: width * 0.04,
      height: width * 0.02,
      alignSelf: 'flex-end',
      transform: [{rotate: '180deg'}],
      marginBottom: width * 0.045,
    },
    title: {
      color: lightTheme.white,
      fontFamily: fonts.mainBold,
      fontSize: width * 0.045,
      alignSelf: 'flex-end',
    },
    desc: {
      color: lightTheme.white,
      fontFamily: fonts.main,
      fontSize: width * 0.023,
      alignSelf: 'flex-end',
      marginTop: 5,
    },
  };
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
        card: {
          ...commonPart.card,
          padding: 20,
          marginVertical: 7,
        },
        img: {
          width: 200,
          height: 120,
        },
        title: {
          ...commonPart.title,
          fontSize: 30,
        },
        desc: {
          ...commonPart.desc,
          fontSize: 15,
          marginTop: 10,
        },
      });
};

const styles = handleStyles();
export default styles;
