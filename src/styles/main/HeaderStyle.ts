import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

const width = Dimensions.get('screen').width;

type Style = {
  headerBox: ViewStyle;
  inputSection: ViewStyle;
  text: TextStyle;
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
      borderColor: lightTheme.red,
      borderRadius: 25,
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    text: {
      fontFamily: fonts.mainBold,
      fontSize: 12,
      color: lightTheme.ligthGray,
    },
  };

  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      inputSection: {
        ...commonPart.inputSection,
        paddingVertical: 3,
      },
      text: {
        ...commonPart.text,
        fontSize: width * 0.03,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      inputSection: {
        ...commonPart.inputSection,
        borderWidth: 1.5,
        paddingVertical: 3,
      },
      text: {
        ...commonPart.text,
        fontSize: 13,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
