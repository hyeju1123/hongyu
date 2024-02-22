import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, TouchableOpacity, View} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

import SvgIcon from '../module/SvgIcon';
import QuizResultCard from '../module/QuizResultCard';

import useToast from '../hooks/toast';
import {Word} from '../recoil/WordListState';
import {ToastIcon} from '../recoil/ToastState';
import {useTheme} from '@react-navigation/native';
import styles from '../styles/quiz/QuizResultPageStyle';
import cardWrapperStyles from '../styles/module/CardWrapperStyle';

type QuizResultPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'QuizResultPage'
>;

enum ResultType {
  CORRECT = 'correct',
  WRONG = 'wrong',
}

export type ResultDataProps = Word & {
  correct: boolean;
};

type ClassifiedDataProps = {
  correct: Word[];
  wrong: Word[];
};

type ItemsProps = {
  count: number;
  data: Word[];
};

const LOAD_DATA_NUM = 15;

function QuizResultPage({
  navigation: {dispatch},
  route: {
    params: {resultData, quizType},
  },
}: QuizResultPageProps) {
  const {
    colors: {healthy, warning, background, contentBackground, transparentBack},
  } = useTheme();
  const {CORRECT, WRONG} = ResultType;

  const {fireToast} = useToast();
  const [nav, setNav] = useState<ResultType>(CORRECT);
  const [data, setData] = useState<ClassifiedDataProps>({
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
    (type: ResultType) => {
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
    ({item: {_id}}: {item: Word}) => {
      return (
        <QuizResultCard id={_id} isCorrected={nav === CORRECT ? true : false} />
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
    const {correct, wrong}: ClassifiedDataProps = {correct: [], wrong: []};
    resultData.map(word => {
      word.correct ? correct.push(word) : wrong.push(word);
    });

    setData({correct, wrong});
  }, [resultData]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={[styles.navTab, styles.dirRow]}>
        <TouchableOpacity
          onPress={() => handleNav(CORRECT)}
          style={[
            styles.dirRow,
            styles.navButton,
            nav === CORRECT && {
              ...styles.bottomLine,
              borderBottomColor: contentBackground,
            },
          ]}>
          <SvgIcon name="Circle" size={10} fill={healthy} />
          <Text style={[styles.text, {color: healthy}]}>
            정답 {lenInfo.correctLen}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNav(WRONG)}
          style={[
            styles.dirRow,
            styles.navButton,
            nav === WRONG && {
              ...styles.bottomLine,
              borderBottomColor: contentBackground,
            },
          ]}>
          <SvgIcon name="Cross" size={10} fill={warning} />
          <Text style={[styles.text, {color: warning}]}>
            오답 {lenInfo.wrongLen}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[cardWrapperStyles.cardWrapper, {backgroundColor: background}]}>
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
      <TouchableOpacity
        style={[
          styles.retryButton,
          {backgroundColor: transparentBack, borderColor: warning},
        ]}
        onPress={retryWrongs}>
        <Text style={[styles.text, {color: warning}]}>오답 다시 하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default QuizResultPage;
