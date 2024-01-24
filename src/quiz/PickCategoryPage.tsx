import React, {useMemo, useState} from 'react';
import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CategoryCardWrapper from '../module/CategoryCardWrapper';
import {useVoca} from '../providers/VocaProvider';
import useUtil from '../hooks/util';
import useToast from '../hooks/toast';
import {InfoType} from '../module/CategoryCardWrapper';

import images from '../styles/images';
import {lightTheme} from '../styles/colors';
import styles from '../styles/quiz/QuizTypePageStyle';
import {ToastIcon} from '../recoil/ToastState';

type PickCategoryPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'PickCategoryPage'
>;

function PickCategoryPage({
  navigation,
  route,
}: PickCategoryPageProps): JSX.Element {
  const {navigate} = navigation;
  const {level} = route.params;
  const {closed} = images.module;
  const {fireToast} = useToast();
  const {getVocasByLevel} = useVoca();
  const filteredTheme = useMemo(
    () => getVocasByLevel(level),
    [getVocasByLevel, level],
  );

  const {items, loadData} = useUtil(filteredTheme);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const categoryData: InfoType<string>[] = items.map(({theme}) => ({
    title: theme,
    desc: '단어 20개',
    icon: 'Matching',
    navData: theme,
  }));

  const selectCategory = (theme: string) => {
    if (selectedCategory.length >= 5) {
      fireToast({
        text: '테마는 5개까지 선택가능합니다',
        icon: ToastIcon.AbNormal,
        remove: true,
      });
      return;
    }
    if (selectedCategory.includes(theme)) {
      fireToast({
        text: '이미 선택된 테마입니다',
        icon: ToastIcon.AbNormal,
        remove: true,
      });
      return;
    }
    setSelectedCategory(prev => [...prev, `${theme}`]);
  };

  const undoSelect = (theme: string) => {
    setSelectedCategory(prev => prev.filter(item => item !== theme));
  };

  const moveToQuizPage = () => {
    if (selectedCategory.length === 0) {
      fireToast({
        text: '테마를 1개 이상 선택해주세요',
        icon: ToastIcon.AbNormal,
        remove: true,
      });
      return;
    }
    navigate('MatchingQuizPage', {level, categories: selectedCategory});
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.themePanel}>
        <View style={styles.dirRow}>
          <Text style={styles.themePanelText}>테마를 선택해주세요</Text>
          {selectedCategory.length > 0 && (
            <TouchableOpacity
              onPress={moveToQuizPage}
              style={styles.labelButton}>
              <Text style={[styles.label, {color: lightTheme.darkRed}]}>
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
              <Image style={styles.closeImage} source={closed} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <CategoryCardWrapper
        nav={selectCategory}
        topPanelHeight={styles.themePanel.minHeight}
        loadData={loadData}
        infos={categoryData}
        theme={lightTheme.darkRed}
      />
    </SafeAreaView>
  );
}

export default PickCategoryPage;
