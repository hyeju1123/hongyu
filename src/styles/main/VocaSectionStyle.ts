import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {lightTheme} from '../colors';
import {fonts} from '../fonts';
import {getDisplaySize, DisplaySize} from '../screen';

type Style = {
  sectionText: TextStyle;
  cardsWrapper: ViewStyle;
  flatlist: ViewStyle;
  columnWrapperStyle: ViewStyle;
  contents: ViewStyle;
  whiteDot: ViewStyle;
  levelText: TextStyle;
  scrap: ViewStyle;
  scrapText: TextStyle;
};

const handleStyles = () => {
  const commonPart: Style = {
    sectionText: {
      fontFamily: fonts.mainBold,
      fontSize: 14,
      color: lightTheme.black,
      marginTop: 10,
      marginLeft: 5,
    },
    cardsWrapper: {
      width: '100%',
    },
    flatlist: {
      width: '100%',
    },
    columnWrapperStyle: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    contents: {
      width: '100%',
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
      fontSize: 18,
      alignSelf: 'center',
      marginVertical: 10,
    },
    scrap: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    scrapText: {
      fontFamily: fonts.mainBold,
      color: lightTheme.white,
      fontSize: 15,
      marginRight: 10,
    },
  };

  console.log(getDisplaySize());
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      whiteDot: {
        ...commonPart.whiteDot,
        width: 4,
        height: 4,
        borderRadius: 2,
      },
      levelText: {
        ...commonPart.levelText,
        fontSize: 15,
      },
      scrapText: {
        ...commonPart.scrapText,
        fontSize: 12,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      // sectionText: {
      //   ...commonPart.sectionText,
      //   fontSize: width * 0.03,
      //   marginTop: 20,
      //   marginBottom: 5,
      // },
      // contents: {
      //   ...commonPart.contents,
      //   width: (width - 120) / 4 + width * 0.05,
      // },
      // whiteDot: {
      //   ...commonPart.whiteDot,
      //   width: width * 0.008,
      //   height: width * 0.008,
      //   borderRadius: (width * 0.008) / 2,
      // },
      // levelText: {
      //   ...commonPart.levelText,
      //   fontSize: width * 0.03,
      //   marginVertical: width * 0.02,
      // },
      // scrapText: {
      //   ...commonPart.scrapText,
      //   fontSize: width * 0.025,
      //   paddingVertical: 5,
      // },
      // scrapImg: {
      //   width: width * 0.035,
      //   height: width * 0.035,
      //   marginLeft: 10,
      // },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
