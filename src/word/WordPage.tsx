import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WordStackParamList} from '../navigation/WordNavigation';
import {QuizPageStackParamList} from '../navigation/QuizNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {Word} from '../recoil/WordListState';
import SvgIcon from '../module/SvgIcon';
import WordCard from '../module/WordCard';
import PickQuizTypeModal from '../module/PickQuizTypeModal';

import usePolly from '../hooks/polly';
import useWordData from '../hooks/wordData';
import {useRecoilValue} from 'recoil';
import {WordNav, wordNavState} from '../recoil/WordNavState';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/word/WordPageStyle';

type WordPageProps = NativeStackScreenProps<WordStackParamList, 'WordPage'>;

const LOAD_DATA_NUM = 20;

function WordPage({
  navigation: {navigate, setOptions},
  route: {
    params: {category},
  },
}: WordPageProps): JSX.Element {
  const {
    colors: {textPrimary},
  } = useTheme();
  const {Busu} = WordNav;
  const {clearMp3File} = usePolly();
  const {navType} = useRecoilValue(wordNavState);
  const words = useWordData(category).wordsFromRecoil;
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<{count: number; data: Word[]}>({
    count: 0,
    data: [],
  });
  const wordsLength = useMemo(() => words.length, [words.length]);

  const onEndReached = useCallback(
    (prevLen: number) => {
      prevLen < wordsLength &&
        setItems(prev => ({
          count: prev.count + LOAD_DATA_NUM,
          data: words.slice(0, prev.count + LOAD_DATA_NUM),
        }));
    },
    [words, wordsLength],
  );

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

  const handleMove = useCallback(
    (quizType: keyof QuizPageStackParamList) => {
      navigate(quizType, {wordData: words});
      setShowModal(false);
    },
    [navigate, words],
  );

  const handleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  useEffect(() => {
    const moveQuizPage = () => (
      <TouchableOpacity style={styles.quizModalButton} onPress={handleModal}>
        <SvgIcon name="Assessment" fill={textPrimary} size={20} />
      </TouchableOpacity>
    );

    navType === Busu
      ? setOptions({headerTitle: category + '획'})
      : setOptions({headerTitle: category, headerRight: moveQuizPage});

    return () => {
      clearMp3File();
    };
  }, [
    clearMp3File,
    navType,
    Busu,
    setOptions,
    category,
    handleModal,
    textPrimary,
  ]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {showModal && (
        <TouchableOpacity onPress={handleModal} style={styles.modalBack}>
          <PickQuizTypeModal
            handleModal={handleModal}
            handleMove={handleMove}
          />
        </TouchableOpacity>
      )}
      <FlashList
        data={items.data}
        renderItem={renderItem}
        estimatedItemSize={100}
        onEndReached={() => onEndReached(items.count)}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashlistContent}
      />
    </SafeAreaView>
  );
}

export default WordPage;
