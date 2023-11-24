import {
  StyleSheet,
  TextStyle,
  ViewStyle,
  ImageStyle,
  Dimensions,
} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  textInput: TextStyle;
  rowWrapper: ViewStyle;
  wordclassImg: ImageStyle;
  wordclassBox: ViewStyle;
  wordclassBoxNone: ViewStyle;
  wcButton: ViewStyle;
  closeButton: ViewStyle;
  closeImage: ImageStyle;
};

const width = Dimensions.get('screen').width;

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
  wordclassBox: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
    paddingTop: 40,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordclassBoxNone: {
    display: 'none',
  },
  wcButton: {
    margin: 8,
  },
  closeButton: {
    position: 'absolute',
    top: width * 0.015,
    right: width * 0.015,
    padding: 10,
  },
  closeImage: {
    width: 15,
    height: 15,
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
