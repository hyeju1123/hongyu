import React, {PropsWithChildren} from 'react';
import {DimensionValue, FlatList, TouchableOpacity, View} from 'react-native';

import styles from '../styles/CardWrapperStyle';
import {lightTheme} from '../styles/colors';
import CategoryCard from './CategoryCard';
import * as Icons from '../styles/svgIndex';

export type InfoType = {
  title: string;
  desc: string;
  icon: keyof typeof Icons;
  navData?: string;
};

type CategoryCardWrapperProps = PropsWithChildren<{
  theme?: string;
  topPanelHeight?: DimensionValue;
  infos: InfoType[];
  nav: (param: string) => void;
  loadData?: () => void;
}>;

function CategoryCardWrapper({
  nav,
  theme = lightTheme.red,
  infos,
  loadData = () => {},
}: CategoryCardWrapperProps) {
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
        renderItem={({item: {title, desc, icon, navData = ''}}) => (
          <TouchableOpacity onPress={() => nav(navData)}>
            <CategoryCard title={title} desc={desc} icon={icon} />
          </TouchableOpacity>
        )}
        onEndReached={loadData}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

export default CategoryCardWrapper;
