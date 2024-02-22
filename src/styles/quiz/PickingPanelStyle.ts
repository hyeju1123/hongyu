import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  panel: ViewStyle;
  panelPart: ViewStyle;
  flatList: ViewStyle;
  columnWrapperStyle: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  query: TextStyle;
  pinyin: TextStyle;
};

const commonPart: Style = {
  panel: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  panelPart: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    width: '100%',
  },
  columnWrapperStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 100,
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    fontFamily: fonts.hanzi,
    fontSize: 13,
    textAlign: 'center',
  },
  query: {
    fontFamily: fonts.hanzi,
    fontSize: 40,
    marginVertical: 10,
  },
  pinyin: {
    fontFamily: fonts.hanzi,
    fontSize: 17,
    marginBottom: 20,
    borderWidth: 1,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      query: {
        ...commonPart.query,
        fontSize: 25,
        marginVertical: 5,
      },
      pinyin: {
        ...commonPart.pinyin,
        fontSize: 9,
        marginBottom: 15,
      },
      button: {
        ...commonPart.button,
        minHeight: 60,
        borderRadius: 3,
      },
      buttonText: {
        ...commonPart.buttonText,
        fontSize: 9,
      },
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
