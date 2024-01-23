import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {lightTheme} from '../colors';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

const width = Dimensions.get('screen').width;

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

  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      logoImg: {
        width: 40,
        height: 60,
      },
      inputSection: {
        ...commonPart.inputSection,
        paddingVertical: 3,
      },
      text: {
        ...commonPart.text,
        fontSize: width * 0.03,
      },
      pencilWithZhImg: {
        width: 15,
        height: 18,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      logoImg: {
        ...commonPart.logoImg,
        width: width * 0.1,
        height: width * 0.15,
      },
      inputSection: {
        ...commonPart.inputSection,
        borderWidth: 1.5,
        paddingVertical: 3,
      },
      text: {
        ...commonPart.text,
        fontSize: 13,
      },
      pencilWithZhImg: {
        width: width * 0.02,
        height: width * 0.024,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
