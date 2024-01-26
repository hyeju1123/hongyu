import React, {useCallback, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WordStackParamList} from '../navigation/WordNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import WordCard from '../module/WordCard';
import {Word} from '../recoil/WordListState';
import usePolly from '../hooks/polly';
import usePaginate from '../hooks/paginate';
import useWordData from '../hooks/wordData';

import styles from '../styles/word/WordPageStyle';

type WordPageProps = NativeStackScreenProps<WordStackParamList, 'WordPage'>;

function WordPage({
  navigation: {navigate},
  route: {
    params: {category},
  },
}: WordPageProps): JSX.Element {
  const {clearMp3File} = usePolly();
  const {wordsFromRecoil} = useWordData(category);

  const {
    rendered: {items},
    loadData,
  } = usePaginate(wordsFromRecoil);

  const renderItem = useCallback(
    ({item: {_id, isBusu}}: {item: Word}) => (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigate(isBusu ? 'BusuDetailPage' : 'VocaDetailPage', {id: _id})
        }>
        <WordCard id={_id} isBusu={isBusu} />
      </TouchableOpacity>
    ),
    [navigate],
  );

  useEffect(() => {
    return () => {
      clearMp3File();
    };
  }, [clearMp3File]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlashList
        data={items}
        renderItem={renderItem}
        estimatedItemSize={90}
        onEndReached={() => loadData(items.length)}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashlistContent}
      />
    </SafeAreaView>
  );
}

export default WordPage;
