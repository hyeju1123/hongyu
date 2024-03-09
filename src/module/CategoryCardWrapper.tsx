import React, {PropsWithChildren, useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import CategoryCard from './CategoryCard';

import * as Icons from '../styles/svgIndex';
import {useTheme} from '@react-navigation/native';
import styles from '../styles/module/CardWrapperStyle';

export type InfoType<T> = {
  title: string;
  desc: string;
  icon: keyof typeof Icons;
  navData: T;
};

type CategoryCardWrapperProps<T> = PropsWithChildren<{
  infos: InfoType<T>[];
  nav: (param: T) => void;
}>;

function CategoryCardWrapper<T>({nav, infos}: CategoryCardWrapperProps<T>) {
  const {
    colors: {shadow, background},
  } = useTheme();

  const renderItem = useCallback(
    ({item: {navData, title, desc, icon}}: {item: InfoType<T>}) => {
      return (
        <TouchableOpacity
          onLayout={e => console.log(e.nativeEvent.layout.height)}
          onPress={() => nav(navData)}>
          <CategoryCard title={title} desc={desc} icon={icon} />
        </TouchableOpacity>
      );
    },
    [nav],
  );

  return (
    <View
      style={[
        styles.cardWrapper,
        {backgroundColor: background, shadowColor: shadow},
      ]}>
      <FlashList
        data={infos}
        renderItem={renderItem}
        estimatedItemSize={105}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashlistContent}
      />
    </View>
  );
}

export default CategoryCardWrapper;
