import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  cardWrapper: ViewStyle;
  card: ViewStyle;
  cardText: TextStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  cardWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: (width - 60) / 2,
    minHeight: width * 0.2,
    backgroundColor: lightTheme.white,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: width * 0.01,
    padding: width * 0.03,
  },
  cardText: {
    fontFamily: fonts.hanzi,
    fontSize: width * 0.035,
    color: lightTheme.black,
  },
};

const handleStyles = () => {
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
        scrollView: {
          marginHorizontal: 35,
        },
      });
};

const styles = handleStyles();
export default styles;
