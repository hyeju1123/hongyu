import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  textInput: TextStyle;
  flexDirRow: ViewStyle;
  classIconWrapper: ViewStyle;
  classIconText: TextStyle;
  xButton: ViewStyle;
  xText: TextStyle;
  buttonWrapper: ViewStyle;
  completeButton: ViewStyle;
  completeText: TextStyle;
  wordclassBox: ViewStyle;
  wordclassBoxNone: ViewStyle;
  wcButton: ViewStyle;
  closeButton: ViewStyle;
};

export const commonPart: Style = {
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: fonts.hanzi,
    fontSize: 15,
    padding: 10,
    marginVertical: 10,
  },
  flexDirRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  classIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 27,
    marginRight: 10,
    marginVertical: 1,
    borderRadius: 5,
  },
  classIconText: {
    fontFamily: fonts.mainBold,
    fontSize: 15,
  },
  xButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    display: 'flex',
  },
  xText: {
    position: 'absolute',
    top: -2,
    right: 2,
    fontFamily: fonts.mainBold,
    fontSize: 9,
  },
  buttonWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 20,
  },
  completeButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  completeText: {
    fontFamily: fonts.mainBold,
    fontSize: 12,
  },
  wordclassBox: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    paddingTop: 40,
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordclassBoxNone: {
    display: 'none',
  },
  wcButton: {
    marginVertical: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 6,
    padding: 10,
  },
};

export const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      textInput: {
        ...commonPart.textInput,
        fontSize: 12,
        padding: 8,
      },
      flexDirRow: {
        ...commonPart.flexDirRow,
        borderWidth: 1,
        padding: 8,
      },
      completeButton: {
        ...commonPart.completeButton,
        padding: 8,
        borderRadius: 6,
      },
      completeText: {
        ...commonPart.completeText,
        fontSize: 10,
      },
      classIconWrapper: {
        ...commonPart.classIconWrapper,
        width: 40,
        height: 20,
      },
      classIconText: {
        ...commonPart.classIconText,
        fontSize: 11,
      },
      xButton: {
        ...commonPart.xButton,
        top: -3,
        right: -3,
        width: 8,
        height: 8,
        borderRadius: 4,
      },
      xText: {
        ...commonPart.xText,
        top: -1,
        right: 2,
        fontSize: 6,
      },
    });
  }
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      textInput: {
        ...commonPart.textInput,
        fontSize: 16,
        padding: 13,
      },
      flexDirRow: {
        ...commonPart.flexDirRow,
        padding: 13,
      },
      completeText: {
        ...commonPart.completeText,
        fontSize: 18,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
