import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  dirRow: ViewStyle;
  hanzi: TextStyle;
  meaningText: TextStyle;
  redText: TextStyle;
  content: ViewStyle;
  notTouched: ViewStyle;
  touched: ViewStyle;
};

const commonPart: Style = {
  dirRow: {
    position: 'absolute',
    top: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
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
    color: lightTheme.black,
  },
  redText: {
    color: lightTheme.red,
  },
  content: {
    marginTop: 3,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    padding: 5,
  },
  notTouched: {
    padding: 3,
    backgroundColor: lightTheme.white,
    borderWidth: 1,
    borderColor: lightTheme.red,
  },
  touched: {
    backgroundColor: lightTheme.oatmeal,
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
      hanzi: {
        ...commonPart.hanzi,
        marginVertical: 10,
        fontSize: 25,
      },
      meaningText: {
        ...commonPart.meaningText,
        fontSize: 15,
      },
      content: {
        ...commonPart.content,
        marginTop: 5,
        padding: 7,
      },
      notTouched: {
        ...commonPart.notTouched,
        padding: 5,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
