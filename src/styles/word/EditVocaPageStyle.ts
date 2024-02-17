import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {lightTheme} from '../colors';
import {DisplaySize, getDisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  textInput: TextStyle;
  flexDirRow: ViewStyle;
  wordclassImg: ImageStyle;
  buttonWrapper: ViewStyle;
  completeButton: ViewStyle;
  completeText: TextStyle;
  wordclassBox: ViewStyle;
  wordclassBoxNone: ViewStyle;
  wcButton: ImageStyle;
  closeButton: ViewStyle;
};

export const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.white,
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
    borderColor: lightTheme.shadowGray,
    fontFamily: fonts.hanzi,
    fontSize: 15,
    color: lightTheme.black,
    padding: 10,
    marginVertical: 10,
  },
  flexDirRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: lightTheme.shadowGray,
    padding: 10,
    marginVertical: 10,
  },
  wordclassImg: {
    resizeMode: 'stretch',
    width: 52,
    height: 28,
    marginRight: 10,
    marginVertical: 1,
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
    backgroundColor: lightTheme.red,
    padding: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 8,
  },
  completeText: {
    fontFamily: fonts.mainBold,
    fontSize: 12,
    color: lightTheme.white,
  },
  wordclassBox: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    paddingTop: 40,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordclassBoxNone: {
    display: 'none',
  },
  wcButton: {
    margin: 8,
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
