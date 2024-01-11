import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {lightTheme} from './colors';
import {getDisplaySize, DisplaySize} from './screen';
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
      textAlign: 'right',
      marginTop: 5,
    },
  };

  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      title: {
        ...commonPart.title,
        fontSize: 12,
      },
      desc: {
        ...commonPart.desc,
        fontSize: 6,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      card: {
        ...commonPart.card,
        padding: 15,
        marginVertical: 7,
        borderRadius: 10,
      },
      img: {
        width: width * 0.2,
        height: width * 0.12,
      },
      title: {
        ...commonPart.title,
        fontSize: width * 0.03,
      },
      desc: {
        ...commonPart.desc,
        fontSize: width * 0.015,
        marginTop: 5,
      },
      arrow: {
        ...commonPart.arrow,
        width: width * 0.03,
        height: width * 0.015,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
