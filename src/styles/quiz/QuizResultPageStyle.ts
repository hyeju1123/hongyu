import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  navTab: ViewStyle;
  dirRow: ViewStyle;
  navButton: ViewStyle;
  bottomLine: ViewStyle;
  flatlistContent: ViewStyle;
  text: TextStyle;
  retryButton: ViewStyle;
  retryText: TextStyle;
};

const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.white,
  },
  navTab: {
    padding: 20,
  },
  dirRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButton: {
    padding: 5,
    marginHorizontal: 15,
  },
  bottomLine: {
    borderBottomWidth: 2,
    borderBottomColor: lightTheme.oatmeal,
  },
  flatlistContent: {
    paddingVertical: 10,
  },
  text: {
    fontFamily: fonts.pinyin,
    fontSize: 13,
    color: lightTheme.black,
    marginHorizontal: 3,
  },
  retryButton: {
    position: 'absolute',
    backgroundColor: lightTheme.transWhite,
    borderWidth: 1,
    borderColor: lightTheme.warning,
    padding: 5,
    borderRadius: 8,
    bottom: 30,
    left: 25,
  },
  retryText: {
    color: lightTheme.warning,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
