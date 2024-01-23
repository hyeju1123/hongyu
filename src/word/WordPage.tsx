import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WordStackParamList} from '../navigation/WordNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TouchableOpacity} from 'react-native';
import WordCard from '../module/WordCard';

import usePolly from '../hooks/polly';
import usePaginate from '../hooks/paginate';
import useWordData from '../hooks/wordData';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {wordListState} from '../recoil/WordListState';

import styles from '../styles/word/WordPageStyle';

type WordPageProps = NativeStackScreenProps<WordStackParamList, 'WordPage'>;

function WordPage({
  navigation: {navigate},
  route: {
    params: {category},
  },
}: WordPageProps): JSX.Element {
  const {clearMp3File} = usePolly();
  const getWordData = useWordData(category);
  const [wordsFromRecoil, setWords] = useRecoilState(wordListState);
  const resetWords = useResetRecoilState(wordListState);

  const {
    rendered: {items},
    loadData,
  } = usePaginate(wordsFromRecoil);

  useEffect(() => {
    const words = getWordData();
    setWords(words);

    return () => {
      resetWords();
    };
  }, [setWords, resetWords, getWordData]);

  useEffect(() => {
    return () => {
      clearMp3File();
    };
  }, [clearMp3File]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={styles.flatlistContent}
        data={items}
        renderItem={({item: {_id, isBusu}}) => (
          <TouchableOpacity
            key={_id}
            activeOpacity={0.5}
            onPress={() =>
              navigate(isBusu ? 'BusuDetailPage' : 'VocaDetailPage', {id: _id})
            }>
            <WordCard id={_id} isBusu={isBusu} />
          </TouchableOpacity>
        )}
        onEndReached={() => loadData(items.length)}
        onEndReachedThreshold={0.8}
      />
    </SafeAreaView>
  );
}

export default WordPage;
