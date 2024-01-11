import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {lightTheme} from './colors';
import {fonts} from './fonts';

type Style = {
  imgWrapper: ViewStyle;
  img: ImageStyle;
  busu: TextStyle;
  xunyin: TextStyle;
  yin: TextStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  imgWrapper: {
    position: 'absolute',
    zIndex: 10,
    top: width * 0.03,
    right: width * 0.03,
  },
  img: {
    marginVertical: width * 0.01,
    width: width * 0.05,
    height: width * 0.05,
  },
  busu: {
    textAlign: 'center',
    fontFamily: fonts.hanzi,
    fontSize: width * 0.1,
    color: lightTheme.black,
  },
  xunyin: {
    fontFamily: fonts.main,
    fontSize: width * 0.025,
    textAlign: 'center',
    color: lightTheme.black,
    lineHeight: 27,
    marginTop: 10,
    marginBottom: -1 * width * 0.018,
  },
  yin: {
    textAlign: 'center',
    fontFamily: fonts.pinyin,
    fontSize: width * 0.035,
    color: lightTheme.darkRed,
  },
};

const handleStyles = () => {
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
