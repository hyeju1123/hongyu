import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HskStackParamList} from '../navigation/HskNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BookmarkStackParamList} from '../navigation/BookmarkNavigation';
import VocaCard from '../module/VocaCard';

import useUtil from '../hooks/util';
import usePolly from '../hooks/polly';
import usePaginate from '../hooks/paginate';
import {useVoca} from '../providers/VocaProvider';
import {wordListState} from '../recoil/WordListState';
import {useRecoilCallback, useRecoilValue, useResetRecoilState} from 'recoil';

import styles from '../styles/WordPageStyle';

type WordPageProps = NativeStackScreenProps<
  HskStackParamList | BookmarkStackParamList,
  'WordPage'
>;

function WordPage({
  navigation: {navigate},
  route: {
    params: {level, category, fromBookmark},
  },
}: WordPageProps): JSX.Element {
  const {clearMp3File} = usePolly();
  const {convertToWord} = useUtil();
  const {getVocasByCategory, getBookmarkedVocas} = useVoca();
  const words = fromBookmark
    ? getBookmarkedVocas(level)
    : getVocasByCategory(level, category);

  const recoilWords = useRecoilValue(wordListState);
  const resetWords = useResetRecoilState(wordListState);
  const setRecoilWords = useRecoilCallback(
    ({set}) =>
      () => {
        const finedWords = words.map(word => convertToWord(word));
        set(wordListState, finedWords);
      },
    [],
  );

  const {
    rendered: {items},
    loadData,
  } = usePaginate(recoilWords);

  useEffect(() => {
    setRecoilWords();
    return () => {
      clearMp3File();
      resetWords();
    };
  }, [clearMp3File, setRecoilWords, resetWords]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={styles.flatlistContent}
        data={items}
        renderItem={({item: {_id}}) => (
          <TouchableOpacity
            onPress={() => navigate('WordDetailPage', {id: _id})}
            key={_id}>
            <VocaCard id={_id} />
          </TouchableOpacity>
        )}
        onEndReached={() => loadData(items.length)}
        onEndReachedThreshold={0.8}
      />
    </SafeAreaView>
  );
}

export default WordPage;
