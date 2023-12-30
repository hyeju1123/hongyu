import React, {PropsWithChildren} from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import Card from './Card';
import styles from '../styles/CategoryCardStyle';
import images from '../styles/images';

type CategoryCardProps = PropsWithChildren<{
  title: string;
  desc: string;
  icon: ImageSourcePropType;
  titleCetner?: boolean;
}>;

function CategoryCard({title, desc, icon}: CategoryCardProps): JSX.Element {
  const {lineArrow} = images.module;
  return (
    <View style={styles.typeButton}>
      <Card marginVertical={10} theme="white" dirRow={true}>
        <Image style={styles.icon} source={icon} />
        <View
          style={[
            styles.typeTextWrapper,
            desc === '' && styles.justifyContent,
          ]}>
          <Text style={styles.title}>{title}</Text>
          {desc !== '' && <Text style={styles.desc}>{desc}</Text>}
        </View>
        <Image style={styles.icon} source={lineArrow} />
      </Card>
    </View>
  );
}

export default CategoryCard;
