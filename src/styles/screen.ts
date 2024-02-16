import {Dimensions} from 'react-native';

export enum DisplaySize {
  Small = 's',
  Medium = 'm',
  Large = 'l',
}

export const getDisplaySize = (): DisplaySize => {
  const width = Dimensions.get('screen').width;
  if (width <= 320) {
    return DisplaySize.Small;
  }
  if (width <= 480) {
    return DisplaySize.Medium;
  }
  return DisplaySize.Large;
};
