import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  cardWrapper: ViewStyle;
  card: ViewStyle;
  cardText: TextStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  cardWrapper: {
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
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      card: {
        ...commonPart.card,
        borderRadius: 5,
      },
      cardText: {
        ...commonPart.cardText,
        fontSize: 10,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      card: {
        ...commonPart.card,
        width: (width - 120) / 2,
        margin: width * 0.01,
        padding: width * 0.015,
      },
      cardText: {
        ...commonPart.cardText,
        fontSize: width * 0.025,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
