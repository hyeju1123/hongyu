import React, {PropsWithChildren} from 'react';
import {DimensionValue, FlatList, TouchableOpacity, View} from 'react-native';

import styles from '../styles/CardWrapperStyle';
import {lightTheme} from '../styles/colors';
import CategoryCard from './CategoryCard';
import * as Icons from '../styles/svgIndex';

export type InfoType<T> = {
  title: string;
  desc: string;
  icon: keyof typeof Icons;
  navData: T;
};

type CategoryCardWrapperProps<T> = PropsWithChildren<{
  theme?: string;
  topPanelHeight?: DimensionValue;
  infos: InfoType<T>[];
  nav: (param: T) => void;
  loadData?: (prevLength: number) => void;
}>;

function CategoryCardWrapper<T>({
  nav,
  theme = lightTheme.red,
  infos,
  loadData = () => {},
}: CategoryCardWrapperProps<T>) {
  console.log(infos.length);
  return (
    <View
      style={[
        styles.cardWrapper,
        {
          backgroundColor: theme,
        },
      ]}>
      <FlatList
        contentContainerStyle={styles.flatlistContent}
        data={infos}
        renderItem={({item: {title, desc, icon, navData}}) => (
          <TouchableOpacity onPress={() => nav(navData)}>
            <CategoryCard title={title} desc={desc} icon={icon} />
          </TouchableOpacity>
        )}
        onEndReached={() => loadData(infos.length)}
        onEndReachedThreshold={0.8}
      />
    </View>
  );
}

export default CategoryCardWrapper;
