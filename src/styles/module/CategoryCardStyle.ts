import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  typeTextWrapper: ViewStyle;
  justifyContent: ViewStyle;
  title: TextStyle;
  desc: TextStyle;
  icon: ViewStyle;
};

const commonPart: Style = {
  typeTextWrapper: {
    flex: 1,
    margin: 15,
    display: 'flex',
    justifyContent: 'space-between',
  },
  justifyContent: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.mainBold,
    fontSize: 13,
    marginBottom: 3,
  },
  desc: {
    fontFamily: fonts.pinyin,
    fontSize: 10,
  },
  icon: {
    width: 24,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      typeTextWrapper: {
        ...commonPart.typeTextWrapper,
        marginVertical: 10,
      },
      title: {
        ...commonPart.title,
        fontSize: 10,
      },
      desc: {
        ...commonPart.desc,
        fontSize: 7,
      },
      icon: {
        width: 25,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      scrollView: {
        marginHorizontal: 35,
      },
      typeTextWrapper: {
        ...commonPart.typeTextWrapper,
        marginHorizontal: 20,
      },
      title: {
        ...commonPart.title,
        fontSize: 16,
        marginBottom: 5,
      },
      desc: {
        ...commonPart.desc,
        fontSize: 12,
      },
      icon: {
        width: 20,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
