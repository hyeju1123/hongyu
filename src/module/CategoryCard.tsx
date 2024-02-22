import React, {PropsWithChildren, memo} from 'react';
import {Text, View} from 'react-native';
import Card from './Card';
import SvgIcon from '../module/SvgIcon';
import * as Icons from '../styles/svgIndex';
import {DisplaySize, getDisplaySize} from '../styles/screen';
import {useTheme} from '@react-navigation/native';
import styles from '../styles/module/CategoryCardStyle';

type CategoryCardProps = PropsWithChildren<{
  title: string;
  desc: string;
  icon: keyof typeof Icons;
}>;

function CategoryCard({title, desc, icon}: CategoryCardProps): JSX.Element {
  const {
    colors: {textPrimary, iconPrimary, deepShadow},
  } = useTheme();

  return (
    <Card
      paddingHorizontal={15}
      marginVertical={getDisplaySize() === DisplaySize.Large ? 12 : 8}
      dirRow={true}>
      <SvgIcon name={icon} fill={iconPrimary} size={styles.icon.width} />
      <View
        style={[styles.typeTextWrapper, desc === '' && styles.justifyContent]}>
        <Text style={[styles.title, {color: textPrimary}]}>{title}</Text>
        {desc !== '' && (
          <Text style={[styles.desc, {color: deepShadow}]}>{desc}</Text>
        )}
      </View>
      <SvgIcon name="LineArrow" fill={iconPrimary} size={styles.icon.width} />
    </Card>
  );
}

export default memo(CategoryCard);
