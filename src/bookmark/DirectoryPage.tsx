import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BookmarkStackParamList} from '../navigation/BookmarkNavigation';

import CategoryCard from '../module/CategoryCard';
import {useVoca} from '../providers/VocaProvider';
import {useFocusEffect} from '@react-navigation/native';

import * as Icons from '../styles/svgIndex';
import styles from '../styles/CategoryPageStyle';

type DirectoryPageProps = NativeStackScreenProps<
  BookmarkStackParamList,
  'DirectoryPage'
>;

type CountObject = {
  [level: number]: number;
};

function DirectoryPage({
  navigation: {navigate},
}: DirectoryPageProps): JSX.Element {
  const {getBookmarkedVocas, getBookmarkedBusues} = useVoca();
  const [vocas, setVocas] = useState(getBookmarkedVocas(0));
  const [busues, setBusues] = useState(getBookmarkedBusues());

  const levelCounts = vocas.reduce((counts: CountObject, item) => {
    const level = item.level;
    counts[level] = (counts[level] || 0) + 1;
    return counts;
  }, {});

  const handlePage = (busu: boolean, title: string, key: string) => {
    if (busu) {
      return () => {
        navigate('BusuPage', {stroke: 0, fromBookmark: true});
      };
    } else {
      return () => {
        navigate('WordPage', {
          level: Number(key),
          category: title,
          fromBookmark: true,
        });
      };
    }
  };

  const injectContent = (
    title: string,
    count: number,
    key: string,
    busu: boolean = false,
  ) => {
    return (
      <TouchableOpacity key={key} onPress={handlePage(busu, title, key)}>
        <CategoryCard
          title={title}
          desc={busu ? `부수 ${count}개` : `단어 ${count}개`}
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
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView style={styles.scrollView}>
        {injectContent('부수', busues.length, 'Busu', true)}
        {injectContent('HSK 모든 단어', vocas.length, '0')}
        {Object.entries(levelCounts).map(([key, value]) =>
          injectContent(`HSK ${key}급`, value, key),
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default DirectoryPage;
