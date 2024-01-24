import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HeaderBackButton} from '@react-navigation/elements';
import {BackHandler, FlatList} from 'react-native';
import QuizResultCard from '../module/QuizResultCard';
import usePaginate from '../hooks/paginate';
import styles from '../styles/quiz/QuizResultPageStyle';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';

type QuizResultPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'QuizResultPage'
>;

function QuizResultPage({
  navigation: {setOptions, pop},
  route: {
    params: {words, corrected},
  },
}: QuizResultPageProps) {
  const {
    loadData,
    rendered: {items},
  } = usePaginate(words);

  useEffect(() => {
    const handleBackButton = (props: HeaderBackButtonProps) => (
      <HeaderBackButton
        {...props}
        onPress={() => {
          pop(2);
        }}
      />
    );

    const handleHardwareBack = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        pop(2);
        return true;
      },
    );
    setOptions({
      headerLeft: handleBackButton,
    });

    return () => handleHardwareBack.remove();
  }, [setOptions, pop]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={styles.flatlistContent}
        data={items}
        renderItem={({item}) => {
          const isCorrected = corrected.includes(item._id);
          return <QuizResultCard voca={item} isCorrected={isCorrected} />;
        }}
        onEndReached={() => loadData(items.length)}
        onEndReachedThreshold={0.8}
      />
    </SafeAreaView>
  );
}

export default QuizResultPage;
