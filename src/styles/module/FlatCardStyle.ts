import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  card: ViewStyle;
  textWrapper: ViewStyle;
  title: TextStyle;
  desc: TextStyle;
};

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
    textWrapper: {
      flex: 1,
      display: 'flex',
      alignItems: 'flex-end',
    },
    title: {
      color: lightTheme.white,
      fontFamily: fonts.mainBold,
      fontSize: 15,
      marginTop: 12,
    },
    desc: {
      color: lightTheme.white,
      fontFamily: fonts.main,
      fontSize: 9,
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
      title: {
        ...commonPart.title,
      },
      desc: {
        ...commonPart.desc,
        marginTop: 5,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
