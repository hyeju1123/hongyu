import React, {PropsWithChildren, memo} from 'react';
import {Text, View} from 'react-native';
import Card from './Card';
import styles from '../styles/module/CategoryCardStyle';
import SvgIcon from '../module/SvgIcon';
import {lightTheme} from '../styles/colors';
import * as Icons from '../styles/svgIndex';
import {DisplaySize, getDisplaySize} from '../styles/screen';
import iconSize from '../styles/iconSize';

type CategoryCardProps = PropsWithChildren<{
  title: string;
  desc: string;
  icon: keyof typeof Icons;
}>;

function CategoryCard({title, desc, icon}: CategoryCardProps): JSX.Element {
  const {category} = iconSize;
  return (
    <Card
      paddingHorizontal={15}
      marginVertical={getDisplaySize() === DisplaySize.Large ? 12 : 8}
      dirRow={true}>
      <SvgIcon name={icon} fill={lightTheme.primary} size={category} />
      <View
        style={[styles.typeTextWrapper, desc === '' && styles.justifyContent]}>
        <Text style={styles.title}>{title}</Text>
        {desc !== '' && <Text style={styles.desc}>{desc}</Text>}
      </View>
      <SvgIcon name="LineArrow" fill={lightTheme.primary} size={category} />
    </Card>
  );
}

export default memo(CategoryCard);
