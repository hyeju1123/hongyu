import React, {PropsWithChildren, useCallback, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WordStackParamList} from '../../navigation/WordNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useVoca} from '../../providers/VocaProvider';

import Voca from '../../model/Voca';
import Busu from '../../model/Busu';
import CategoryCard from '../../module/CategoryCard';

import * as Icons from '../../styles/svgIndex';
import styles from '../../styles/word/CategoryPageStyle';
import {useSetRecoilState} from 'recoil';
import {BookedNav, bookedNavState} from '../../recoil/WordNavState';

type BookedCategoryPagepProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    WordStackParamList,
    'CategoryBranchPage',
    undefined
  >;
}>;

const BUSU_CATEGORY_KEY = 214;
const HSK_ALL_CATEGORY_KEY = 0;

function BookedCategoryPage({
  navigation: {navigate},
}: BookedCategoryPagepProps): JSX.Element {
  const bookedNavSetter = useSetRecoilState(bookedNavState);
  const {getBookmarkedVocas, getBookmarkedBusues} = useVoca();
  const [vocas, setVocas] = useState<Voca[]>([]);
  const [busues, setBusues] = useState<Busu[]>([]);

  console.log('bookmarkedCategoryPage is render');

  const countedLevelWords = vocas.reduce(
    (counts: {[level: number]: number}, {level}) => {
      counts[level] = (counts[level] || 0) + 1;
      return counts;
    },
    {},
  );

  const moveToWordPage = useCallback(
    (category: string, key: number) => {
      const bookedNavType =
        key === BUSU_CATEGORY_KEY ? BookedNav.Busu : BookedNav.Voca;
      bookedNavSetter(() => ({bookedNavType, bookedLevel: key}));
      navigate('WordPage', {category});
    },
    [navigate, bookedNavSetter],
  );

  const injectContent = (title: string, count: number, key: number) => {
    return (
      <TouchableOpacity key={key} onPress={() => moveToWordPage(title, key)}>
        <CategoryCard
          title={title}
          desc={`${key === BUSU_CATEGORY_KEY ? '부수' : '단어'} ${count}개`}
          icon={`Circle${key}` as keyof typeof Icons}
        />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      setVocas(getBookmarkedVocas(0));
      setBusues(getBookmarkedBusues());
    }, [getBookmarkedVocas, getBookmarkedBusues]),
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {injectContent('부수', busues.length, BUSU_CATEGORY_KEY)}
        {injectContent('HSK 모든 단어', vocas.length, HSK_ALL_CATEGORY_KEY)}
        <View style={styles.line} />
        {Object.entries(countedLevelWords).map(([key, value]) =>
          injectContent(`HSK ${key}급`, value, Number(key)),
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default BookedCategoryPage;
