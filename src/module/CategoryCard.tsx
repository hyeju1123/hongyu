import React, {PropsWithChildren} from 'react';
import {Text, View} from 'react-native';
import Card from './Card';
import styles from '../styles/CategoryCardStyle';
import SvgIcon from '../module/SvgIcon';
import {lightTheme} from '../styles/colors';
import * as Icons from '../styles/svgIndex';
import {DisplaySize, getDisplaySize} from '../styles/screen';

type CategoryCardProps = PropsWithChildren<{
  title: string;
  desc: string;
  icon: keyof typeof Icons;
  titleCetner?: boolean;
}>;

function CategoryCard({title, desc, icon}: CategoryCardProps): JSX.Element {
  return (
    <Card
      paddingHorizontal={15}
      marginVertical={getDisplaySize() === DisplaySize.Large ? 12 : 8}
      theme="white"
      dirRow={true}>
      <SvgIcon name={icon} fill={lightTheme.darkRed} />
      <View
        style={[styles.typeTextWrapper, desc === '' && styles.justifyContent]}>
        <Text style={styles.title}>{title}</Text>
        {desc !== '' && <Text style={styles.desc}>{desc}</Text>}
      </View>
      <SvgIcon name="LineArrow" fill={lightTheme.darkRed} />
    </Card>
  );
}

export default CategoryCard;
