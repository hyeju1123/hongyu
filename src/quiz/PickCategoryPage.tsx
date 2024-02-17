import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CategoryCardWrapper from '../module/CategoryCardWrapper';
import {useVoca} from '../providers/VocaProvider';

import useUtil from '../hooks/util';
import useToast from '../hooks/toast';
import * as Icons from '../styles/svgIndex';
import SvgIcon from '../module/SvgIcon';

import {lightTheme} from '../styles/colors';
import styles from '../styles/quiz/QuizTypePageStyle';
import {ToastIcon} from '../recoil/ToastState';
import {useResetRecoilState, useSetRecoilState} from 'recoil';
import {wordListState} from '../recoil/WordListState';
import iconSize from '../styles/iconSize';

const PICK_MAXIMUM = 5;

type PickCategoryPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'PickCategoryPage'
>;

function PickCategoryPage({
  navigation: {navigate},
  route: {
    params: {level, quizType},
  },
}: PickCategoryPageProps): JSX.Element {
  const {pickCategoryClose} = iconSize;
  const {fireToast} = useToast();
  const {shuffleArray, convertToWord} = useUtil();
  const {countVocaByCategory, getVocasByMultipleCategory} = useVoca();
  const filteredTheme = useMemo(
    () => countVocaByCategory(level),
    [countVocaByCategory, level],
  );

  const categories = useMemo(
    () =>
      Object.entries(filteredTheme).map(([key, value]) => {
        const title = key;
        const desc = '단어 ' + value + '개';
        const icon = 'CheckCircle' as keyof typeof Icons;

        return {title, desc, icon, navData: key};
      }),
    [filteredTheme],
  );
  const setWords = useSetRecoilState(wordListState);
  const resetWords = useResetRecoilState(wordListState);

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const selectCategory = useCallback((theme: string) => {
    setSelectedCategory(prev => {
      if (prev.includes(theme) || prev.length >= PICK_MAXIMUM) {
        return prev;
      }
      return [...prev, theme];
    });
  }, []);

  const undoSelect = useCallback((theme: string) => {
    setSelectedCategory(prev => prev.filter(item => item !== theme));
  }, []);

  const moveToQuizPage = () => {
    const wordData = shuffleArray(
      getVocasByMultipleCategory(level, selectedCategory),
    ).map(convertToWord);
    setWords(wordData);
    navigate(quizType, {wordData});
  };

  useEffect(() => {
    if (selectedCategory.length >= PICK_MAXIMUM) {
      fireToast({
        text: '테마는 5개까지 선택가능합니다',
        icon: ToastIcon.AbNormal,
        remove: true,
      });
    }
    return () => {
      resetWords();
    };
  }, [selectedCategory.length, fireToast, resetWords]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.themePanel}>
        <View style={styles.dirRow}>
          {selectedCategory.length > 0 && (
            <TouchableOpacity
              onPress={moveToQuizPage}
              style={styles.labelButton}>
              <Text style={[styles.label, {color: lightTheme.red}]}>
                선택완료
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.labelWrapper}>
          {selectedCategory.map(category => (
            <TouchableOpacity
              onPress={() => undoSelect(category)}
              key={category}
              style={styles.labelButton}>
              <Text style={styles.label}>{category}</Text>
              <View style={styles.closeWrapper}>
                <SvgIcon
                  name="Cross"
                  size={pickCategoryClose}
                  fill={lightTheme.red}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <CategoryCardWrapper nav={selectCategory} infos={categories} />
    </SafeAreaView>
  );
}

export default PickCategoryPage;
