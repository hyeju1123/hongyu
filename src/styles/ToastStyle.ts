import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  container: ViewStyle;
  icon: ImageStyle;
  closeImage: ImageStyle;
  text: TextStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  container: {
    display: 'flex',
    position: 'absolute',
    marginTop: 100,
    backgroundColor: lightTheme.white,
    alignSelf: 'center',
    minWidth: '65%',
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.028,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 10,
  },
  icon: {
    width: width * 0.04,
    height: width * 0.04,
  },
  closeImage: {
    width: width * 0.025,
    height: width * 0.025,
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    marginHorizontal: width * 0.02,
    fontFamily: fonts.pinyin,
    fontSize: width * 0.03,
    color: lightTheme.black,
  },
};

const handleStyles = () => {
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
        container: {
          ...commonPart.container,
          paddingVertical: width * 0.015,
          paddingHorizontal: width * 0.02,
        },
        icon: {
          width: width * 0.025,
          height: width * 0.025,
        },
        closeImage: {
          width: width * 0.015,
          height: width * 0.015,
        },
        text: {
          ...commonPart.text,
          fontSize: width * 0.016,
          marginHorizontal: width * 0.015,
          marginBottom: width * -1 * 0.01,
        },
      });
};

const styles = handleStyles();
export default styles;
