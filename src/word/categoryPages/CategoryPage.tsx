import React, {PropsWithChildren, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WordStackParamList} from '../../navigation/WordNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import CategoryCardWrapper from '../../module/CategoryCardWrapper';
import {useRecoilValue} from 'recoil';
import {WordNav, wordNavState} from '../../recoil/WordNavState';

import usePaginate from '../../hooks/paginate';
import {useVoca} from '../../providers/VocaProvider';

import * as Icons from '../../styles/svgIndex';
import styles from '../../styles/word/CategoryPageStyle';

type CategoryPageProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    WordStackParamList,
    'CategoryBranchPage',
    undefined
  >;
}>;

function CategoryPage({
  navigation: {navigate},
}: CategoryPageProps): JSX.Element {
  const {navType, level} = useRecoilValue(wordNavState);
  const {countVocaByCategory, countBusuByStroke} = useVoca();
  const isVocaNav = navType === WordNav.Voca ? true : false;
  const fetchedData = isVocaNav
    ? countVocaByCategory(level)
    : countBusuByStroke();

  const categories = Object.entries(fetchedData).map(([key, value]) => {
    const title = isVocaNav ? key : `${key}획 ${key === '10' ? '이상' : ''}`;
    const desc = `${isVocaNav ? '단어' : '부수'} ${value}개`;
    const icon = (
      isVocaNav ? 'CheckCircle' : `Circle${key}`
    ) as keyof typeof Icons;

    return {title, desc, icon, navData: key};
  });

  const {
    loadData,
    rendered: {items},
  } = usePaginate(categories);

  const moveToWordPage = useCallback(
    (category: string) => {
      navigate('WordPage', {category});
    },
    [navigate],
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
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
