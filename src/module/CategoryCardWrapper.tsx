import React, {PropsWithChildren, useCallback, useMemo, useState} from 'react';
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

const LOAD_DATA_NUM = 15;

function CategoryCardWrapper<T>({nav, infos}: CategoryCardWrapperProps<T>) {
  const {
    colors: {shadow, background},
  } = useTheme();
  const [items, setItems] = useState<{count: number; data: InfoType<T>[]}>({
    count: 0,
    data: [],
  });
  const infosLength = useMemo(() => infos.length, [infos.length]);

  const onEndReached = useCallback(
    (prevLen: number) => {
      prevLen < infosLength &&
        setItems(prev => ({
          count: prev.count + LOAD_DATA_NUM,
          data: infos.slice(0, prev.count + LOAD_DATA_NUM),
        }));
    },
    [infos, infosLength],
  );

  const renderItem = useCallback(
    ({item: {navData, title, desc, icon}}: {item: InfoType<T>}) => {
      return (
        <TouchableOpacity onPress={() => nav(navData)}>
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
        data={items.data}
        renderItem={renderItem}
        estimatedItemSize={100}
        onEndReached={() => onEndReached(items.count)}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashlistContent}
      />
    </View>
  );
}

export default CategoryCardWrapper;
