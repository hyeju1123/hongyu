import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  dirRow: ViewStyle;
  dirCol: ViewStyle;
  hanzi: TextStyle;
  meaningText: TextStyle;
  content: ViewStyle;
  notTouched: ViewStyle;
  progressDot: ViewStyle;
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
  dirCol: {
    display: 'flex',
    alignItems: 'center',
  },
  hanzi: {
    marginVertical: 13,
    fontFamily: fonts.hanzi,
    fontSize: 22,
  },
  meaningText: {
    marginVertical: 2,
    fontFamily: fonts.pinyin,
    fontSize: 12,
  },
  content: {
    marginTop: 3,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    padding: 5,
  },
  notTouched: {
    padding: 8,
    borderWidth: 1,
  },
  progressDot: {
    marginTop: 3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'black',
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      hanzi: {
        ...commonPart.hanzi,
        fontSize: 18,
        marginVertical: 7,
      },
      meaningText: {
        ...commonPart.meaningText,
        fontSize: 10,
      },
      content: {
        ...commonPart.content,
        padding: 3,
      },
      notTouched: {
        ...commonPart.notTouched,
        padding: 1,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      hanzi: {
        ...commonPart.hanzi,
        marginVertical: 15,
        fontSize: 28,
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
