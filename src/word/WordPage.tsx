import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  RootStackParamList,
  QuizPageStackParamList,
} from '../navigation/StackParamListType';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, TouchableOpacity, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {Word} from '../recoil/WordListState';
import SvgIcon from '../module/SvgIcon';
import WordCard from '../module/WordCard';
import PickQuizTypeModal from '../module/PickQuizTypeModal';
import {ToastIcon} from '../recoil/ToastState';

import useToast from '../hooks/toast';
import usePolly from '../hooks/polly';
import useWordData from '../hooks/wordData';
import {useRecoilValue} from 'recoil';
import {WordNav, wordNavState} from '../recoil/WordNavState';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/word/WordPageStyle';

type WordPageProps = NativeStackScreenProps<RootStackParamList, 'WordPage'>;

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
  const {fireToast} = useToast();
  const {clearMp3File} = usePolly();
  const {navType} = useRecoilValue(wordNavState);
  const words = useWordData(category).wordsFromRecoil;
  const [showModal, setShowModal] = useState(false);
  const priorTouched = useRef<number[]>([]);

  const renderItem = useCallback(
    ({item: {_id, isBusu}}: {item: Word}) => (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigate(isBusu ? 'BusuDetailPage' : 'VocaDetailPage', {id: _id})
        }>
        <WordCard
          id={_id}
          isBusu={isBusu}
          priorTouched={priorTouched.current}
        />
      </TouchableOpacity>
    ),
    [navigate],
  );

  const handleMove = useCallback(
    (quizType: keyof QuizPageStackParamList) => {
      if (words.length === 0) {
        fireToast({
          text: '단어장에 저장된 단어가 없어요!\n저장 후 응시해주세요',
          icon: ToastIcon.AbNormal,
          remove: true,
        });
      } else {
        navigate(quizType, {wordData: words});
        setShowModal(false);
      }
    },
    [navigate, words, fireToast],
  );

  const handleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  useLayoutEffect(() => {
    const moveQuizPage = () =>
      category === '부수' ? (
        <View />
      ) : (
        <TouchableOpacity style={styles.quizModalButton} onPress={handleModal}>
          <SvgIcon name="Assessment" fill={textPrimary} size={20} />
        </TouchableOpacity>
      );

    navType === Busu
      ? setOptions({headerTitle: category + '획'})
      : setOptions({headerTitle: category, headerRight: moveQuizPage});
  }, [navType, Busu, setOptions, category, handleModal, textPrimary]);

  useEffect(() => {
    return () => {
      clearMp3File();
    };
  }, [clearMp3File]);

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
      {words.length === 0 && (
        <View style={styles.emptyBox}>
          <SvgIcon
            name={'Empty'}
            fill={textPrimary}
            size={styles.emptyIcon.width}
          />
          <Text style={[styles.emptyText, {color: textPrimary}]}>
            {'저장된 단어가 없어요!\n홍등버튼을 눌러 단어장에 추가해보세요'}
          </Text>
        </View>
      )}
      <FlashList
        data={words}
        renderItem={renderItem}
        estimatedItemSize={120}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashlistContent}
      />
    </SafeAreaView>
  );
}

export default WordPage;
