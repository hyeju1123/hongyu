import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {lightTheme} from '../colors';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

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
    marginHorizontal: width * 0.05,
    marginTop: width * 0.15,
    marginBottom: width * 0.02,
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
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      ...commonPart,
      guideText: {
        ...commonPart.guideText,
        marginTop: 20,
        fontSize: 13,
      },
      themePanelText: {
        ...commonPart.themePanelText,
        fontSize: 13,
      },
      labelButton: {
        ...commonPart.labelButton,
        paddingHorizontal: 4,
        paddingVertical: 2,
      },
      label: {
        ...commonPart.label,
        fontSize: 11,
      },
    });
  }

  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      ...commonPart,
      scrollView: {
        marginHorizontal: 35,
      },
      guideText: {
        ...commonPart.guideText,
        fontSize: width * 0.04,
      },
      themePanelText: {
        ...commonPart.themePanelText,
        fontSize: width * 0.04,
        padding: 10,
      },
      labelButton: {
        ...commonPart.labelButton,
        paddingHorizontal: width * 0.01,
        marginHorizontal: width * 0.01,
        paddingVertical: 3,
        alignSelf: 'center',
        borderRadius: 8,
      },
      label: {
        ...commonPart.label,
        fontSize: width * 0.03,
      },
      closeImage: {
        marginLeft: 5,
        width: width * 0.013,
        height: width * 0.013,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
