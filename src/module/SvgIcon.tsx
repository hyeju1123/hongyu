import React from 'react';
import {SvgProps} from 'react-native-svg';

import * as Icons from '../styles/svgIndex';
import {DisplaySize, getDisplaySize} from '../styles/screen';
import {Dimensions} from 'react-native';

type IconProps = SvgProps & {
  name: keyof typeof Icons;
  size?: number;
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
  return <Icon {...props} fill={fill} width={size} height={size} />;
}

export default SvgIcon;
