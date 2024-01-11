import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {getDisplaySize, DisplaySize} from './screen';
import {fonts} from './fonts';

type Style = {
  typeTextWrapper: ViewStyle;
  justifyContent: ViewStyle;
  title: TextStyle;
  desc: TextStyle;
};

const width = Dimensions.get('screen').width;

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
    color: lightTheme.black,
    fontSize: width * 0.035,
    marginBottom: 3,
  },
  desc: {
    fontFamily: fonts.pinyin,
    color: lightTheme.gray,
    fontSize: width * 0.025,
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
        fontSize: width * 0.03,
      },
      desc: {
        ...commonPart.desc,
        fontSize: width * 0.02,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
