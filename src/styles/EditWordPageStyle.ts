import {
  StyleSheet,
  TextStyle,
  ViewStyle,
  ImageStyle,
  Dimensions,
} from 'react-native';
import {lightTheme} from './colors';
import {DisplaySize, getDisplaySize} from './screen';
import {fonts} from './fonts';

type Style = {
  container: ViewStyle;
  scrollView: ViewStyle;
  textInput: TextStyle;
  rowWrapper: ViewStyle;
  wordclassImg: ImageStyle;
  wordclassBox: ViewStyle;
  wordclassBoxNone: ViewStyle;
  completeButton: ViewStyle;
  completeText: TextStyle;
  completeImg: ImageStyle;
  wcButton: ViewStyle;
  closeButton: ViewStyle;
  closeImage: ImageStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.red,
  },
  scrollView: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  textInput: {
    borderRadius: 10,
    backgroundColor: lightTheme.white,
    padding: 20,
    marginTop: 20,
    fontFamily: fonts.hanzi,
    fontSize: 20,
  },
  rowWrapper: {
    borderRadius: 10,
    backgroundColor: lightTheme.white,
    padding: 20,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordclassImg: {
    resizeMode: 'stretch',
    width: 65,
    height: 35,
    marginRight: 10,
    marginVertical: 1,
  },
  wordclassBox: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
  completeButton: {
    borderRadius: 8,
    padding: 10,
    marginVertical: 30,
    backgroundColor: lightTheme.white,
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeText: {
    fontFamily: fonts.mainBold,
    fontSize: width * 0.035,
    color: lightTheme.black,
  },
  completeImg: {
    width: width * 0.035,
    height: width * 0.035,
    marginRight: width * 0.01,
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
  closeImage: {
    width: 15,
    height: 15,
  },
};

const handleStyles = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      textInput: {
        ...commonPart.textInput,
        padding: 12,
        fontSize: 15,
      },
      wordclassImg: {
        ...commonPart.wordclassImg,
        width: 50,
        height: 27,
        marginRight: 5,
      },
      wordclassBox: {
        ...commonPart.wordclassBox,
        padding: 10,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      scrollView: {
        ...commonPart.scrollView,
        marginHorizontal: 35,
      },
      completeText: {
        ...commonPart.completeText,
        fontSize: width * 0.02,
      },
      completeImg: {
        width: width * 0.02,
        height: width * 0.02,
        marginRight: 5,
      },
    });
  }

  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
