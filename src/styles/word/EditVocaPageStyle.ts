import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
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

const width = Dimensions.get('screen').width;

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
    borderWidth: 0.5,
    borderColor: lightTheme.shadowGray,
    fontFamily: fonts.hanzi,
    fontSize: width * 0.04,
    color: lightTheme.black,
    padding: 10,
    marginVertical: 10,
  },
  flexDirRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 8,
    borderWidth: 0.5,
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
    fontSize: width * 0.03,
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
    top: width * 0.015,
    right: width * 0.015,
    padding: 10,
  },
};

export const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
