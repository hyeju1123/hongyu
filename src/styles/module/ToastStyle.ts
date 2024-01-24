import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  displayFlex: ViewStyle;
  displayNone: ViewStyle;
  text: TextStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  container: {
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
  displayFlex: {
    display: 'flex',
  },
  displayNone: {
    display: 'none',
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
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      container: {
        ...commonPart.container,
        marginTop: width * 0.2,
        paddingVertical: width * 0.01,
        borderRadius: 10,
      },
      text: {
        ...commonPart.text,
        fontSize: width * 0.018,
        color: lightTheme.black,
      },
      icon: {
        width: width * 0.02,
        height: width * 0.02,
      },
      closeImage: {
        width: width * 0.01,
        height: width * 0.01,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;