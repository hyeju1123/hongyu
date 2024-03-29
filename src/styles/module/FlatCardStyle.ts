import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  card: ViewStyle;
  textWrapper: ViewStyle;
  title: TextStyle;
  desc: TextStyle;
  icon: ViewStyle;
  mainArrow: ViewStyle;
};

const handleStyles = () => {
  const commonPart: Style = {
    card: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
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
      fontFamily: fonts.mainBold,
      fontSize: 15,
      marginTop: 12,
    },
    desc: {
      fontFamily: fonts.main,
      fontSize: 9,
      marginTop: 5,
    },
    icon: {
      width: 140,
      height: 85,
    },
    mainArrow: {
      width: 18,
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
      icon: {
        width: 120,
        height: 72,
      },
      mainArrow: {
        width: 16,
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
        fontSize: 18,
      },
      desc: {
        ...commonPart.desc,
        fontSize: 12,
        marginTop: 8,
      },
      icon: {
        width: 160,
        height: 97,
      },
      mainArrow: {
        width: 18,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
