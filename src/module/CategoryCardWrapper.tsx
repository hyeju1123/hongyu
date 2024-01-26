import React, {PropsWithChildren, useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import CategoryCard from './CategoryCard';

import {lightTheme} from '../styles/colors';
import styles from '../styles/module/CardWrapperStyle';

import * as Icons from '../styles/svgIndex';

export type InfoType<T> = {
  title: string;
  desc: string;
  icon: keyof typeof Icons;
  navData: T;
};

type CategoryCardWrapperProps<T> = PropsWithChildren<{
  theme?: string;
  infos: InfoType<T>[];
  nav: (param: T) => void;
  loadData?: (prevLength: number) => void;
}>;

function CategoryCardWrapper<T>({
  nav,
  theme = lightTheme.white,
  infos,
  loadData = () => {},
}: CategoryCardWrapperProps<T>) {
  const renderItem = useCallback(
    ({item: {navData, title, desc, icon}}: {item: InfoType<T>}) => (
      <TouchableOpacity onPress={() => nav(navData)}>
        <CategoryCard title={title} desc={desc} icon={icon} />
      </TouchableOpacity>
    ),
    [nav],
  );

  return (
    <View
      style={[
        styles.cardWrapper,
        {
          backgroundColor: theme,
        },
      ]}>
      <FlashList
        data={infos}
        renderItem={renderItem}
        estimatedItemSize={90}
        onEndReached={() => loadData(infos.length)}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashlistContent}
      />
    </View>
  );
}

export default CategoryCardWrapper;
