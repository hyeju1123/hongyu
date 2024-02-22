import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
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
};

const commonPart: Style = {
  container: {
    flex: 1,
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
  },
  flatlistContent: {
    paddingVertical: 10,
  },
  text: {
    fontFamily: fonts.pinyin,
    fontSize: 13,
    marginHorizontal: 3,
  },
  retryButton: {
    position: 'absolute',
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
    bottom: 30,
    left: 25,
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
