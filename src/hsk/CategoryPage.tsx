import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HskStackParamList} from '../navigation/HskNavigation';
import CategoryCardWrapper, {InfoType} from '../module/CategoryCardWrapper';
import usePaginate from '../hooks/paginate';
import {useVoca} from '../providers/VocaProvider';

import styles from '../styles/CategoryPageStyle';

type CategoryPageProps = NativeStackScreenProps<
  HskStackParamList,
  'CategoryPage'
>;

function CategoryPage({
  navigation: {navigate},
  route: {
    params: {level},
  },
}: CategoryPageProps): JSX.Element {
  const {countVocaByCategory} = useVoca();

  const themeInfos: InfoType<{level: number; category: string}>[] =
    Object.entries(countVocaByCategory(level)).map(([key, value]) => {
      return {
        title: key,
        desc: `단어 ${value}개`,
        icon: 'CheckCircle',
        navData: {level: level, category: key},
      };
    });

  const {
    loadData,
    rendered: {items},
  } = usePaginate(themeInfos);

  const moveToWordPage = useCallback(
    (navData: {level: number; category: string}) => {
      navigate('WordPage', navData);
    },
    [navigate],
  );

  return (
    <SafeAreaView edges={['bottom']} style={[styles.container]}>
      <StatusBar
        translucent={true}
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <CategoryCardWrapper
        infos={items}
        loadData={loadData}
        nav={moveToWordPage}
      />
    </SafeAreaView>
  );
}

export default CategoryPage;
