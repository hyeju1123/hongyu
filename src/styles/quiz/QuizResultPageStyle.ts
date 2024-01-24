import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  flatlist: ViewStyle;
  flatlistContent: ViewStyle;
  dirRow: ViewStyle;
  lantern: ImageStyle;
  hanzi: TextStyle;
  meaningText: TextStyle;
};

const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.white,
  },
  flatlist: {
    marginHorizontal: 20,
  },
  flatlistContent: {
    paddingVertical: 10,
  },
  dirRow: {
    position: 'absolute',
    top: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  lantern: {
    width: 20,
    height: 20,
  },
  hanzi: {
    marginVertical: 8,
    fontFamily: fonts.hanzi,
    fontSize: 20,
    color: lightTheme.black,
  },
  meaningText: {
    marginVertical: 2,
    fontFamily: fonts.pinyin,
    fontSize: 12,
    color: lightTheme.gray,
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
