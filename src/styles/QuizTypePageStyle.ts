import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {lightTheme} from './colors';
import {isPhone} from './screen';
import {fonts} from './fonts';

type Style = {
  container: ViewStyle;
  guideText: TextStyle;
  themePanel: ViewStyle;
  themePanelText: TextStyle;
  labelWrapper: ViewStyle;
  labelButton: ViewStyle;
  label: TextStyle;
  closeImage: ImageStyle;
  completeImage: ImageStyle;
  dirRow: ViewStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.darkRed,
  },
  guideText: {
    paddingHorizontal: 20,
    paddingTop: 50,
    fontFamily: fonts.mainBold,
    fontSize: width * 0.05,
    color: lightTheme.white,
  },
  themePanel: {
    minHeight: width * 0.25,
    paddingHorizontal: 20,
  },
  dirRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  themePanelText: {
    fontFamily: fonts.mainBold,
    fontSize: width * 0.05,
    color: lightTheme.white,
    flex: 1,
  },
  labelWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 30,
  },
  labelButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: lightTheme.white,
  },
  label: {
    fontFamily: fonts.mainBold,
    color: lightTheme.black,
  },
  closeImage: {
    marginLeft: 4,
    width: width * 0.015,
    height: width * 0.015,
  },
  completeImage: {
    marginLeft: 4,
    width: width * 0.03,
    height: width * 0.03,
  },
};

const handleStyles = () => {
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
        scrollView: {
          marginHorizontal: 35,
        },
      });
};

const styles = handleStyles();
export default styles;
