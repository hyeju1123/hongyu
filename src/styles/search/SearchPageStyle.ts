import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';
import {commonPart as mainCommonPart} from '../main/MainPageStyle';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  flashlistContent: ViewStyle;
  inputWrapper: ViewStyle;
  input: TextStyle;
  backButton: ViewStyle;
  resultBar: ViewStyle;
  text: TextStyle;
  meaningText: TextStyle;
  levelText: TextStyle;
  searchIcon: ViewStyle;
  mainArrowIcon: ViewStyle;
};

export const commonPart: Style = {
  ...mainCommonPart,
  flashlistContent: {
    paddingHorizontal: 20,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    fontFamily: fonts.hanzi,
    paddingHorizontal: 10,
  },
  backButton: {
    transform: [{rotateY: '180deg'}],
  },
  resultBar: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 0.8,
  },
  text: {
    fontFamily: fonts.hanzi,
    marginHorizontal: 2,
    paddingVertical: 1,
  },
  meaningText: {
    flex: 1,
    marginHorizontal: 7,
    fontFamily: fonts.hanzi,
  },
  levelText: {
    fontFamily: fonts.hanzi,
    paddingHorizontal: 3,
    marginHorizontal: 2,
  },
  searchIcon: {
    width: 15,
  },
  mainArrowIcon: {
    width: 18,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      searchIcon: {
        width: 15,
      },
      mainArrowIcon: {
        width: 18,
      },
    });
  }
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      searchIcon: {
        width: 12,
      },
      mainArrowIcon: {
        width: 16,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
