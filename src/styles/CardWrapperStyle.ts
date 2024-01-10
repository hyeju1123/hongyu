import {StyleSheet, ViewStyle} from 'react-native';
import {isPhone} from './screen';

type Style = {
  cardWrapper: ViewStyle;
};

const commonPart: Style = {
  cardWrapper: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    flex: 1,
    top: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
};

const handleStyles = () => {
  return isPhone()
    ? StyleSheet.create({...commonPart})
    : StyleSheet.create({
        ...commonPart,
      });
};

const styles = handleStyles();
export default styles;
