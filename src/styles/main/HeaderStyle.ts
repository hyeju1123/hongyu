import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  headerBox: ViewStyle;
  inputSection: ViewStyle;
  text: TextStyle;
  hongIcon: ViewStyle;
  searchIcon: ViewStyle;
};

const handleStyles = () => {
  const commonPart: Style = {
    headerBox: {
      display: 'flex',
      alignItems: 'center',
      paddingVertical: 5,
    },
    inputSection: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    text: {
      fontFamily: fonts.mainBold,
      fontSize: 12,
    },
    hongIcon: {
      width: 60,
    },
    searchIcon: {
      width: 15,
    },
  };

  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      inputSection: {
        ...commonPart.inputSection,
        paddingVertical: 6,
      },
      text: {
        ...commonPart.text,
        fontSize: 9,
      },
      hongIcon: {
        width: 50,
      },
      searchIcon: {
        width: 12,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      headerBox: {
        ...commonPart.headerBox,
        paddingVertical: 20,
      },
      inputSection: {
        ...commonPart.inputSection,
        borderWidth: 1.5,
        paddingVertical: 5,
      },
      text: {
        ...commonPart.text,
        fontSize: 14,
      },
      hongIcon: {
        width: 95,
      },
      searchIcon: {
        width: 15,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
