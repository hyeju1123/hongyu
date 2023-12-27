import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {commonPart as mainCommonPart} from './MainPageStyle';
import {fonts} from './fonts';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  inputWrapper: ViewStyle;
  input: TextStyle;
  pencilWithZhImg: ImageStyle;
  resultBar: ViewStyle;
  text: TextStyle;
  meaningText: TextStyle;
  levelText: TextStyle;
};

export const commonPart: Style = {
  ...mainCommonPart,
  scrollView: {
    ...mainCommonPart.scrollView,
    paddingVertical: 15,
    marginBottom: 10,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomColor: lightTheme.red,
    borderBottomWidth: 1,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontFamily: fonts.hanzi,
    color: lightTheme.black,
    paddingHorizontal: 10,
  },
  pencilWithZhImg: {
    width: 20,
    height: 20,
  },
  resultBar: {
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 0.8,
    borderBottomColor: lightTheme.ligthGray,
  },
  text: {
    fontFamily: fonts.hanzi,
    color: lightTheme.black,
    marginHorizontal: 2,
  },
  meaningText: {
    flex: 1,
    marginHorizontal: 7,
    fontFamily: fonts.hanzi,
    color: lightTheme.gray,
  },
  levelText: {
    fontFamily: fonts.hanzi,
    color: lightTheme.white,
    backgroundColor: lightTheme.black,
    paddingHorizontal: 3,
    marginHorizontal: 2,
  },
};

const handleStyles = () => {
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
        scrollView: {
          ...commonPart.scrollView,
          marginHorizontal: 35,
        },
      });
};

const styles = handleStyles();
export default styles;
