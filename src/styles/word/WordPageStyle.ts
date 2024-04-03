import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  flashlistContent: ViewStyle;
  modalBack: ViewStyle;
  quizModalButton: ViewStyle;
  emptyBox: ViewStyle;
  emptyIcon: ViewStyle;
  emptyText: TextStyle;
};

export const commonPart: Style = {
  container: {
    flex: 1,
  },
  flashlistContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  modalBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  quizModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  emptyBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    width: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fonts.pinyin,
    marginVertical: 10,
    textAlign: 'center',
  },
};

export const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      emptyIcon: {
        width: 25,
      },
      emptyText: {
        ...commonPart.emptyText,
        fontSize: 20,
        marginVertical: 16,
      },
    });
  }
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      emptyIcon: {
        width: 16,
      },
      emptyText: {
        ...commonPart.emptyText,
        fontSize: 13,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
