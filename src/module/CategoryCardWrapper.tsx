import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
  memo,
} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import CategoryCard from './CategoryCard';

import styles from '../styles/module/CardWrapperStyle';

import * as Icons from '../styles/svgIndex';

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
    <View style={styles.cardWrapper}>
      <FlashList
        data={items.data}
        renderItem={renderItem}
        estimatedItemSize={90}
        onEndReached={() => onEndReached(items.count)}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashlistContent}
      />
    </View>
  );
}

export default memo(CategoryCardWrapper) as typeof CategoryCardWrapper;
