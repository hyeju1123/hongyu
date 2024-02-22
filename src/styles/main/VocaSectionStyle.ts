import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  columnWrapperStyle: ViewStyle;
  contents: ViewStyle;
  dot: ViewStyle;
  levelText: TextStyle;
  sectionText: TextStyle;
  scrap: ViewStyle;
  scrapText: TextStyle;
  lanternIcon: ViewStyle;
};

const handleStyles = () => {
  const commonPart: Style = {
    contents: {
      width: '100%',
    },
    columnWrapperStyle: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    dot: {
      width: 5,
      height: 5,
      borderRadius: 2.5,
    },
    levelText: {
      fontFamily: fonts.mainBold,
      fontSize: 18,
      alignSelf: 'center',
      marginVertical: 10,
    },
    sectionText: {
      fontFamily: fonts.mainBold,
      fontSize: 14,
      marginTop: 10,
      marginLeft: 5,
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
      fontSize: 15,
      marginRight: 10,
    },
    lanternIcon: {
      width: 25,
    },
  };

  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      dot: {
        ...commonPart.dot,
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
      lanternIcon: {
        width: 25,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      sectionText: {
        ...commonPart.sectionText,
        fontSize: 16,
        marginTop: 20,
        marginBottom: 5,
      },
      levelText: {
        ...commonPart.levelText,
        fontSize: 20,
      },
      scrapText: {
        ...commonPart.scrapText,
        fontSize: 15,
      },
      lanternIcon: {
        width: 18,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
