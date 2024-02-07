import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {StackActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Voca from '../model/Voca';
import {FlashList} from '@shopify/flash-list';
import {Text, TouchableOpacity, View} from 'react-native';
import SvgIcon from '../module/SvgIcon';
import QuizResultCard from '../module/QuizResultCard';

import useToast from '../hooks/toast';
import {ToastIcon} from '../recoil/ToastState';
import {lightTheme} from '../styles/colors';
import styles from '../styles/quiz/QuizResultPageStyle';
import cardWrapperStyles from '../styles/module/CardWrapperStyle';

enum resultType {
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

type DataProps = {
  correct: Voca[];
  wrong: Voca[];
};

const LOAD_DATA_NUM = 15;

function QuizResultPage({
  navigation: {dispatch},
  route: {
    params: {words, corrected, quizType},
  },
}: QuizResultPageProps) {
  const {green, warning, white} = lightTheme;
  const {CORRECT, WRONG} = resultType;

  const {fireToast} = useToast();

  const [nav, setNav] = useState<resultType>(CORRECT);
  const [data, setData] = useState<DataProps>({
    correct: [],
    wrong: [],
  });
  const [items, setItems] = useState<ItemsProps>({
    count: 0,
    data: [],
  });
  const lenInfo = useMemo(() => {
    const {correct, wrong} = data;
    return {correctLen: correct.length, wrongLen: wrong.length};
  }, [data]);

  const handleNav = useCallback(
    (type: resultType) => {
      setNav(type);
      setItems(() => ({
        count: LOAD_DATA_NUM,
        data: data[type].slice(0, LOAD_DATA_NUM),
      }));
    },
    [data],
  );

  const onEndReached = useCallback(
    (prevLen: number) => {
      const {correctLen, wrongLen} = lenInfo;
      const len = nav === CORRECT ? correctLen : wrongLen;
      prevLen < len &&
        setItems(prev => ({
          count: prev.count + LOAD_DATA_NUM,
          data: data[nav].slice(0, prev.count + LOAD_DATA_NUM),
        }));
    },
    [data, nav, CORRECT, lenInfo],
  );

  const renderItem = useCallback(
    ({item}: {item: Voca}) => {
      return (
        <QuizResultCard
          voca={item}
          isCorrected={nav === CORRECT ? true : false}
        />
      );
    },
    [nav, CORRECT],
  );

  const retryWrongs = useCallback(() => {
    const {wrong} = data;
    if (wrong.length === 0) {
      fireToast({
        text: '오답인 단어가 없어요!',
        icon: ToastIcon.AbNormal,
        remove: true,
      });
      return;
    }
    dispatch(
      StackActions.replace(quizType, {
        wordData: wrong,
      }),
    );
  }, [dispatch, data, fireToast, quizType]);

  useEffect(() => {
    const correct = words.filter(({_id}) => corrected.includes(_id));
    const wrong = words.filter(({_id}) => !corrected.includes(_id));
    setData({correct, wrong});
  }, [words, corrected]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={[styles.navTab, styles.dirRow]}>
        <TouchableOpacity
          onPress={() => handleNav(CORRECT)}
          style={[
            styles.dirRow,
            styles.navButton,
            nav === CORRECT && styles.bottomLine,
          ]}>
          <SvgIcon name="Circle" size={13} fill={green} />
          <Text style={[styles.text, {color: green}]}>
            정답 {lenInfo.correctLen}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNav(WRONG)}
          style={[
            styles.dirRow,
            styles.navButton,
            nav === WRONG && styles.bottomLine,
          ]}>
          <SvgIcon name="Cross" size={13} fill={warning} />
          <Text style={[styles.text, {color: warning}]}>
            오답 {lenInfo.wrongLen}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[cardWrapperStyles.cardWrapper, {backgroundColor: white}]}>
        <FlashList
          data={items.data}
          estimatedItemSize={90}
          renderItem={renderItem}
          onEndReached={() => onEndReached(items.count)}
          onEndReachedThreshold={0.8}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlistContent}
        />
      </View>
      <TouchableOpacity style={styles.retryButton} onPress={retryWrongs}>
        <Text style={[styles.text, styles.retryText]}>오답 다시 하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default QuizResultPage;
