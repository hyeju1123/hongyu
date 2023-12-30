import React, {PropsWithChildren, useState} from 'react';
import {
  Animated,
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
  infos: InfoType[];
  nav: (param: string) => void;
}>;

function CategoryCardWrapper({
  nav,
  theme = lightTheme.red,
  infos,
}: CategoryCardWrapperProps) {
  const [scrollY] = useState(new Animated.Value(0));

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const height = Dimensions.get('screen').height;
  const headerHeight = useHeaderHeight();

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          minHeight: height - headerHeight,
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
      />
    </Animated.View>
  );
}

export default CategoryCardWrapper;
