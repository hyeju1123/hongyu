import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {DisplaySize, getDisplaySize} from '../screen';
import {commonPart as mainCommonPart} from '../main/MainPageStyle';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  inputWrapper: ViewStyle;
  input: TextStyle;
  backButton: ViewStyle;
  resultBar: ViewStyle;
  text: TextStyle;
  meaningText: TextStyle;
  levelText: TextStyle;
};

export const commonPart: Style = {
  ...mainCommonPart,
  scrollViewContent: {
    paddingVertical: 10,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomColor: lightTheme.red,
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    fontFamily: fonts.hanzi,
    color: lightTheme.black,
    paddingHorizontal: 10,
  },
  backButton: {
    transform: [{rotateY: '180deg'}],
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
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      scrollView: {
        ...commonPart.scrollView,
        marginHorizontal: 35,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
