import {Dimensions} from 'react-native';

export const isPhone = () => {
  const width = Dimensions.get('screen').width;
  return width > 475 ? false : true;
};
