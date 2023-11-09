import {
  Dimensions,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import {lightTheme} from './colors';
import {fonts} from './fonts';
import {isPhone} from './screen';

const width = Dimensions.get('screen').width;

type Style = {
  sectionText: TextStyle;
  cardsWrapper: ViewStyle;
  contents: ViewStyle;
  whiteDot: ViewStyle;
  levelText: TextStyle;
  scrap: ViewStyle;
  scrapText: TextStyle;
  scrapImg: ImageStyle;
};

const handleStyles = () => {
  const commonPart: Style = {
    sectionText: {
      fontFamily: fonts.mainBold,
      color: lightTheme.black,
      marginTop: 10,
      marginLeft: 5,
    },
    cardsWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    contents: {
      width: width * 0.385,
    },
    whiteDot: {
      backgroundColor: lightTheme.white,
      width: 5,
      height: 5,
      borderRadius: 2.5,
    },
    levelText: {
      color: lightTheme.white,
      fontFamily: fonts.mainBold,
      fontSize: 20,
      alignSelf: 'center',
      marginVertical: 10,
    },
    scrap: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    scrapText: {
      fontFamily: fonts.mainBold,
      color: lightTheme.white,
      fontSize: 15,
    },
    scrapImg: {
      width: 25,
      height: 25,
      marginLeft: 10,
    },
  };
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
        sectionText: {
          ...commonPart.sectionText,
          fontSize: 25,
          marginTop: 20,
          marginBottom: 5,
        },
        contents: {
          ...commonPart.contents,
          width: width * 0.275,
        },
        whiteDot: {
          ...commonPart.whiteDot,
          width: 8,
          height: 8,
          borderRadius: 4,
        },
        levelText: {
          ...commonPart.levelText,
          fontSize: 30,
          marginVertical: 20,
        },
        scrap: {
          ...commonPart.scrap,
          paddingVertical: 5,
        },
        scrapText: {
          ...commonPart.scrapText,
          fontSize: 23,
        },
        scrapImg: {
          width: 40,
          height: 40,
          marginLeft: 15,
        },
      });
};

const styles = handleStyles();
export default styles;
