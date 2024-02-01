import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HeaderBackButton} from '@react-navigation/elements';
import {BackHandler, Text, TouchableOpacity, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import SvgIcon from '../module/SvgIcon';
import QuizResultCard from '../module/QuizResultCard';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {lightTheme} from '../styles/colors';
import styles from '../styles/quiz/QuizResultPageStyle';
import cardWrapperStyles from '../styles/module/CardWrapperStyle';
import Voca from '../model/Voca';

enum resultType {
  ALL = 'all',
  CORRECT = 'correct',
  WRONG = 'wrong',
}

type QuizResultPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'QuizResultPage'
>;

type ItemsProps = {
  count: number;
  data: Voca[];
};

const LOAD_DATA_NUM = 15;

function QuizResultPage({
  navigation: {setOptions, pop},
  route: {
    params: {words, corrected},
  },
}: QuizResultPageProps) {
  const {green, red, white} = lightTheme;
  const {ALL, CORRECT, WRONG} = resultType;

  const correctWords = useMemo(
    () => words.filter(({_id}) => corrected.includes(_id)),
    [words, corrected],
  );
  const wrongWords = useMemo(
    () => words.filter(({_id}) => !corrected.includes(_id)),
    [words, corrected],
  );
  const [nav, setNav] = useState<resultType>(ALL);
  const [items, setItems] = useState<ItemsProps>({
    count: 0,
    data: [],
  });

  const handleNav = useCallback(
    (type: resultType) => {
      let fullData: Voca[] = words;

      switch (type) {
        case CORRECT:
          fullData = correctWords;
          break;
        case WRONG:
          fullData = wrongWords;
          break;
      }

      setNav(type);
      setItems(prev => ({
        ...prev,
        count: prev.count + LOAD_DATA_NUM,
        data: fullData.slice(0, prev.count + LOAD_DATA_NUM),
      }));
    },
    [CORRECT, WRONG, correctWords, wrongWords, words],
  );

  const onEndReached = useCallback(() => {
    let fullData: Voca[] = words;

    switch (nav) {
      case CORRECT:
        fullData = correctWords;
        break;
      case WRONG:
        fullData = wrongWords;
        break;
    }

    setItems(prev => {
      if (prev.count < fullData.length) {
        return {
          ...prev,
          count: prev.count + LOAD_DATA_NUM,
          data: fullData.slice(0, prev.count + LOAD_DATA_NUM),
        };
      } else {
        return prev;
      }
    });
  }, [CORRECT, WRONG, correctWords, wrongWords, words, nav]);

  const renderItem = useCallback(
    ({item}: {item: Voca}) => {
      let isCorrected = null;
      if (nav === ALL) {
        isCorrected = corrected.includes(item._id);
      } else if (nav === WRONG) {
        isCorrected = false;
      } else {
        isCorrected = true;
      }
      return <QuizResultCard voca={item} isCorrected={isCorrected} />;
    },
    [nav, ALL, WRONG, corrected],
  );

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
      <View style={[styles.navTab, styles.dirRow]}>
        <TouchableOpacity
          onPress={() => handleNav(ALL)}
          style={[
            styles.dirRow,
            styles.navButton,
            nav === ALL && styles.bottomLine,
          ]}>
          <Text style={styles.text}>전체 {words.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNav(CORRECT)}
          style={[
            styles.dirRow,
            styles.navButton,
            nav === CORRECT && styles.bottomLine,
          ]}>
          <SvgIcon name="Circle" size={13} fill={green} />
          <Text style={[styles.text, {color: green}]}>
            정답 {correctWords.length}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNav(WRONG)}
          style={[
            styles.dirRow,
            styles.navButton,
            nav === WRONG && styles.bottomLine,
          ]}>
          <SvgIcon name="Cross" size={13} fill={red} />
          <Text style={[styles.text, {color: red}]}>
            오답 {wrongWords.length}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[cardWrapperStyles.cardWrapper, {backgroundColor: white}]}>
        <FlashList
          data={items.data}
          estimatedItemSize={90}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.8}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlistContent}
        />
      </View>
    </SafeAreaView>
  );
}

export default QuizResultPage;
