import React from 'react';
import {SvgProps} from 'react-native-svg';

import * as Icons from '../styles/svgIndex';
import {Dimensions} from 'react-native';

type IconProps = SvgProps & {
  name: keyof typeof Icons;
  size?: number;
};

const width = Dimensions.get('window').width;
const defaultSize = width * 0.1;

function SvgIcon({name, size = defaultSize, fill, ...props}: IconProps) {
  const Icon = Icons[name];
  return <Icon {...props} fill={fill} width={size} height={size} />;
}

export default SvgIcon;
