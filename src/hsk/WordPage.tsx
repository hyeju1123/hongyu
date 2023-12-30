import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HskStackParamList} from '../navigation/HskNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BookmarkStackParamList} from '../navigation/BookmarkNavigation';
import WordCard from '../module/WordCard';

import uesUtil from '../hooks/util';
import usePolly from '../hooks/polly';
import {useVoca} from '../providers/VocaProvider';

import styles from '../styles/WordPageStyle';

type WordPageProps = NativeStackScreenProps<
  HskStackParamList | BookmarkStackParamList,
  'WordPage'
>;

function WordPage({navigation, route}: WordPageProps): JSX.Element {
  const {navigate} = navigation;
  const {level, category, fromBookmark} = route.params;
  const {clearMp3File} = usePolly();
  const {getVocasByCategory, getBookmarkedVocas} = useVoca();
  const words = fromBookmark
    ? getBookmarkedVocas(level)
    : getVocasByCategory(level, category);
  const {items, loadData} = uesUtil(words);

  const moveToDetailPage = (id: number) => {
    navigate('WordDetailPage', {id});
  };

  useEffect(() => {
    navigation.setOptions({headerTitle: category});
    return () => {
      clearMp3File();
    };
  }, [clearMp3File, navigation, category]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={items}
        renderItem={({item}) => (
          <WordCard
            key={item._id}
            wordData={item}
            moveToDetailPage={moveToDetailPage}
          />
        )}
        onEndReached={loadData}
        onEndReachedThreshold={0.8}
      />
    </SafeAreaView>
  );
}

export default WordPage;
