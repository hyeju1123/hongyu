import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';
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
  closeWrapper: ViewStyle;
  dirRow: ViewStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.white,
  },
  guideText: {
    marginHorizontal: width * 0.05,
    marginTop: width * 0.15,
    marginBottom: width * 0.02,
    fontFamily: fonts.mainBold,
    fontSize: width * 0.05,
    color: lightTheme.black,
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
    marginTop: 20,
  },
  labelButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: lightTheme.red,
    marginHorizontal: 3,
    marginVertical: 3,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  label: {
    fontFamily: fonts.mainBold,
    color: lightTheme.black,
  },
  closeWrapper: {
    marginLeft: 4,
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
        paddingHorizontal: 8,
        marginHorizontal: 4,
        paddingVertical: 3,
        alignSelf: 'center',
      },
      label: {
        ...commonPart.label,
        fontSize: 18,
      },
      closeWrapper: {
        marginLeft: 7,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
