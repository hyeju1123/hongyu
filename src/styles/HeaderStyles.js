import {StyleSheet} from 'react-native';
import {lightTheme} from './colors';

const styles = StyleSheet.create({
  headerBox: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImg: {
    width: 50,
    height: 75,
  },
  inputSection: {
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    paddingLeft: 20,
    paddingRight: 55,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: lightTheme.red,
    borderRadius: 25,
  },
  pencilWithZhImgWrapper: {
    position: 'absolute',
    right: 20,
  },
  pencilWithZhImg: {
    width: 20,
    height: 23,
  },
});

export default styles;
