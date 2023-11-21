import {StyleSheet, TextStyle, ViewStyle, ImageStyle} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  textInput: TextStyle;
  rowWrapper: ViewStyle;
  wordclassImg: ImageStyle;
};

const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.red,
  },
  scrollView: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  textInput: {
    borderRadius: 10,
    backgroundColor: lightTheme.white,
    padding: 20,
    marginTop: 20,
    fontFamily: fonts.hanzi,
    fontSize: 20,
  },
  rowWrapper: {
    borderRadius: 10,
    backgroundColor: lightTheme.white,
    padding: 20,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordclassImg: {
    resizeMode: 'stretch',
    width: 65,
    height: 35,
    marginRight: 10,
    marginVertical: 1,
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
