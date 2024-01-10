import React, {PropsWithChildren, useState} from 'react';
import {
  Animated,
  DimensionValue,
  Dimensions,
  FlatList,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import styles from '../styles/CardWrapperStyle';
import {lightTheme} from '../styles/colors';
import CategoryCard from './CategoryCard';

type InfoType = {
  title: string;
  desc: string;
  icon: ImageSourcePropType;
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
  topPanelHeight = 0,
}: CategoryCardWrapperProps) {
  const [scrollY] = useState(new Animated.Value(0));

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, topPanelHeight ? -20 : -50],
    extrapolate: 'clamp',
  });

  const height = Dimensions.get('screen').height;
  const headerHeight = useHeaderHeight();

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          minHeight: height - headerHeight - 15 - topPanelHeight * 2,
          backgroundColor: theme,
          transform: [{translateY}],
        },
      ]}>
      <FlatList
        data={infos}
        renderItem={({item: {title, desc, icon, navData = ''}}) => (
          <TouchableOpacity onPress={() => nav(navData)}>
            <CategoryCard title={title} desc={desc} icon={icon} />
          </TouchableOpacity>
        )}
        onScroll={handleScroll}
        onEndReached={loadData}
        onEndReachedThreshold={0.8}
      />
    </Animated.View>
  );
}

export default CategoryCardWrapper;
