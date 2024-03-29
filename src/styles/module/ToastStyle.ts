import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  displayFlex: ViewStyle;
  displayNone: ViewStyle;
  text: TextStyle;
  icon: ViewStyle;
  closeIcon: ViewStyle;
};

const commonPart: Style = {
  container: {
    position: 'absolute',
    marginTop: 100,
    alignSelf: 'center',
    minWidth: '65%',
    padding: 11,
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
    marginHorizontal: 12,
    fontFamily: fonts.pinyin,
    fontSize: 11,
  },
  icon: {
    width: 15,
  },
  closeIcon: {
    width: 10,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      container: {
        ...commonPart.container,
        marginTop: 70,
        padding: 9,
      },
      text: {
        ...commonPart.text,
        fontSize: 9,
        marginHorizontal: 10,
      },
      icon: {
        width: 12,
      },
      closeIcon: {
        width: 8,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      container: {
        ...commonPart.container,
        marginTop: 130,
        padding: 14,
      },
      text: {
        ...commonPart.text,
        fontSize: 15,
        marginHorizontal: 15,
      },
      icon: {
        width: 18,
      },
      closeIcon: {
        width: 12,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
