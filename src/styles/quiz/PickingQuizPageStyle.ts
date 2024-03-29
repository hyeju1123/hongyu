import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  scrollViewContent: ViewStyle;
  guideText: TextStyle;
  bottomNav: ViewStyle;
  horizonFlip: ViewStyle;
};

const commonPart: Style = {
  container: {
    flex: 1,
  },
  scrollViewContent: {
    display: 'flex',
    flexGrow: 1,
    marginHorizontal: 20,
  },
  guideText: {
    flex: 1,
    fontFamily: fonts.hanzi,
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 20,
  },
  bottomNav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  horizonFlip: {
    transform: [{rotateY: '180deg'}],
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      guideText: {
        ...commonPart.guideText,
        fontSize: 10,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
