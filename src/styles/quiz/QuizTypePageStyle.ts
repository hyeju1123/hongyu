import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {getDisplaySize, DisplaySize} from '../screen';
import {fonts} from '../fonts';

type Style = {
  container: ViewStyle;
  guideText: TextStyle;
  themePanel: ViewStyle;
  labelWrapper: ViewStyle;
  labelButton: ViewStyle;
  label: TextStyle;
  closeWrapper: ViewStyle;
  dirRow: ViewStyle;
  close: ViewStyle;
};

const width = Dimensions.get('screen').width;

const commonPart: Style = {
  container: {
    flex: 1,
  },
  guideText: {
    marginHorizontal: width * 0.05,
    marginTop: width * 0.15,
    marginBottom: width * 0.02,
    fontFamily: fonts.mainBold,
    fontSize: 18,
  },
  themePanel: {
    minHeight: width * 0.25,
    paddingHorizontal: 20,
    display: 'flex',
    alignItems: 'flex-end',
  },
  dirRow: {
    display: 'flex',
    flexDirection: 'row',
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
    marginHorizontal: 3,
    marginVertical: 3,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.mainBold,
  },
  closeWrapper: {
    marginLeft: 4,
  },
  close: {
    width: 8,
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
      labelButton: {
        ...commonPart.labelButton,
        paddingHorizontal: 4,
        paddingVertical: 2,
      },
      label: {
        ...commonPart.label,
        fontSize: 11,
      },
      close: {
        width: 4,
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
        fontSize: 22,
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
        fontSize: 16,
      },
      closeWrapper: {
        marginLeft: 7,
      },
      close: {
        width: 8,
      },
    });
  }
  return StyleSheet.create({...commonPart});
};

const styles = handleStyles();
export default styles;
