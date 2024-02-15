import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';
import {lightTheme} from '../colors';

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
    borderColor: lightTheme.ligthGray,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    fontFamily: fonts.hanzi,
    fontSize: 13,
    color: lightTheme.gray,
    textAlign: 'center',
  },
  query: {
    fontFamily: fonts.hanzi,
    fontSize: 40,
    color: lightTheme.black,
    marginVertical: 10,
  },
  pinyin: {
    fontFamily: fonts.hanzi,
    fontSize: 17,
    color: lightTheme.red,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: lightTheme.transparent,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;