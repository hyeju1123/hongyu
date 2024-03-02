import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WordStackParamList} from '../../navigation/WordNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CategoryCardWrapper, {InfoType} from '../../module/CategoryCardWrapper';
import {useRecoilValue} from 'recoil';
import {WordNav, wordNavState} from '../../recoil/WordNavState';

import {useVoca} from '../../providers/VocaProvider';

import * as Icons from '../../styles/svgIndex';
import {useTheme} from '@react-navigation/native';
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
  const {
    colors: {background},
  } = useTheme();
  const {navType, level} = useRecoilValue(wordNavState);
  const {countVocaByCategory, countBusuByStroke} = useVoca();
  const [infos, setInfos] = useState<InfoType<string>[]>([]);

  const isVocaNav = navType === WordNav.Voca ? true : false;

  const moveToWordPage = useCallback(
    (category: string) => {
      navigate('WordPage', {category});
    },
    [navigate],
  );

  useEffect(() => {
    const fetchedData = isVocaNav
      ? countVocaByCategory(level)
      : countBusuByStroke();
    const categories = Object.entries(fetchedData).map(([key, value]) => {
      const title = isVocaNav
        ? key
        : key + '획' + (key === '10' ? ' 이상' : '');
      const desc = (isVocaNav ? '단어 ' : '부수 ') + value + '개';
      const icon = (
        isVocaNav ? 'Circle' + level : 'Circle' + key
      ) as keyof typeof Icons;

      return {title, desc, icon, navData: key};
    });
    setInfos(categories);
  }, [isVocaNav, countVocaByCategory, countBusuByStroke, level]);

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, {backgroundColor: background}]}>
      <CategoryCardWrapper infos={infos} nav={moveToWordPage} />
    </SafeAreaView>
  );
}

export default CategoryPage;
