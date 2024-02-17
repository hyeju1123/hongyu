import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  cardWrapper: ViewStyle;
  flatList: ViewStyle;
  columnWrapperStyle: ViewStyle;
  card: ViewStyle;
  cardText: TextStyle;
};

const commonPart: Style = {
  cardWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 15,
  },
  flatList: {
    width: '100%',
  },
  columnWrapperStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    minHeight: 75,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontFamily: fonts.hanzi,
    fontSize: 12,
    color: lightTheme.black,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      cardWrapper: {
        ...commonPart.cardWrapper,
        marginTop: 7,
      },
      card: {
        ...commonPart.card,
        minHeight: 55,
        borderRadius: 5,
      },
      cardText: {
        ...commonPart.cardText,
        fontSize: 8,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      cardWrapper: {
        ...commonPart.cardWrapper,
        marginTop: 20,
      },
      card: {
        ...commonPart.card,
        minHeight: 90,
      },
      cardText: {
        ...commonPart.cardText,
        fontSize: 15,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
