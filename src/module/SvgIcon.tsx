import React from 'react';
import {SvgProps} from 'react-native-svg';

import * as Icons from '../styles/svgIndex';
import {DisplaySize, getDisplaySize} from '../styles/screen';
import {DimensionValue, Dimensions} from 'react-native';

type IconProps = SvgProps & {
  name: keyof typeof Icons;
  size?: DimensionValue;
};

const width = Dimensions.get('screen').width;
const getDefaultIconSize = () => {
  if (getDisplaySize() === DisplaySize.Small) {
    return 20;
  }
  if (getDisplaySize() === DisplaySize.Large) {
    return width * 0.05;
  }
  return 30;
};
const defaultSize = getDefaultIconSize();

function SvgIcon({name, size = defaultSize, fill, ...props}: IconProps) {
  const Icon = Icons[name];
  const sizeNum = Number(size);
  return <Icon {...props} fill={fill} width={sizeNum} height={sizeNum} />;
}

export default SvgIcon;
