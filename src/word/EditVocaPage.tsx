import React, {useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/StackParamListType';
import {UpdateVocaContent, useVoca} from '../providers/VocaProvider';
import useToast from '../hooks/toast';
import useUtil from '../hooks/util';
import SvgIcon from '../module/SvgIcon';
import {ToastIcon} from '../recoil/ToastState';

import {vocaState} from '../recoil/WordListState';
import {useRecoilCallback, useRecoilValue} from 'recoil';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/word/EditVocaPageStyle';

type EditVocaPageProps = NativeStackScreenProps<
  RootStackParamList,
  'EditVocaPage'
>;

type TextValProps = {
  word: string;
  intonation: string;
  meaning: string;
  explanation: string | undefined;
};

function EditVocaPage({
  navigation: {goBack},
  route: {
    params: {id},
  },
}: EditVocaPageProps) {
  const {
    colors: {
      background,
      textPrimary,
      iconPrimary,
      ongoingState,
      cardBorderLine,
      transparentContentBack,
    },
  } = useTheme();
  const {updateVoca} = useVoca();
  const vocaItem = useRecoilValue(vocaState(id));
  const memoizedVocaItem = useMemo(() => vocaItem, [vocaItem]);
  const {word, intonation, wordclass, meaning, explanation} = memoizedVocaItem;

  const {fireToast} = useToast();
  const {getWCLabels, limitTextLength} = useUtil();
  const [textVal, setTextVal] = useState<TextValProps>({
    word,
    intonation: intonation.slice(1, -1),
    meaning,
    explanation,
  });
  const [currentWC, setCurrentWC] = useState(wordclass.split(', '));
  const [showWCTemplate, setShowWCTemplate] = useState(false);

  const handleChangeText = (name: string, value: string) => {
    !limitTextLength(value) && setTextVal(prev => ({...prev, [name]: value}));
  };

  const getFilteredWC = () => {
    const wcLabels = getWCLabels();
    return wcLabels.filter(label => !currentWC.includes(label));
  };

  const handleUpdateVoca = useRecoilCallback(
    ({set}) =>
      (finalTextVal: TextValProps, finalWC: string[]) => {
        if (finalWC.length === 0) {
          fireToast({
            text: '품사를 하나 이상 선택해주세요!',
            icon: ToastIcon.AbNormal,
            remove: true,
          });
          return;
        }

        const updatedVoca: UpdateVocaContent = {
          ...finalTextVal,
          intonation: '[' + finalTextVal.intonation + ']',
          wordclass: finalWC.join(', '),
        };
        updateVoca(id, updatedVoca);

        set(vocaState(id), {...vocaItem, ...updatedVoca});

        fireToast({
          text: '단어를 수정하였습니다!',
          icon: ToastIcon.Normal,
          remove: true,
        });
        goBack();
      },
    [vocaItem],
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <TextInput
          style={[
            styles.textInput,
            {color: textPrimary, borderColor: cardBorderLine},
          ]}
          value={textVal.word}
          onChangeText={value => handleChangeText('word', value)}
          placeholder="단어를 입력하세요"
          onFocus={() => setShowWCTemplate(false)}
        />
        <TextInput
          style={[
            styles.textInput,
            {color: textPrimary, borderColor: cardBorderLine},
          ]}
          value={textVal.intonation}
          onChangeText={value => handleChangeText('intonation', value)}
          placeholder="발음을 입력하세요"
          onFocus={() => setShowWCTemplate(false)}
        />
        <TouchableOpacity
          onPress={() => setShowWCTemplate(true)}
          style={[styles.flexDirRow, {borderColor: cardBorderLine}]}>
          {currentWC.map((wc: string) => (
            <TouchableOpacity
              key={wc}
              style={[styles.classIconWrapper, {backgroundColor: iconPrimary}]}
              onPress={() =>
                setCurrentWC(prev => prev.filter(label => label !== wc))
              }>
              <View style={[styles.xButton, {backgroundColor: ongoingState}]}>
                <SvgIcon name="Cross" size={5} fill={textPrimary} />
              </View>
              <Text style={[styles.classIconText, {color: background}]}>
                {wc}
              </Text>
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
        <TextInput
          multiline
          style={[
            styles.textInput,
            {color: textPrimary, borderColor: cardBorderLine},
          ]}
          value={textVal.meaning}
          onChangeText={value => handleChangeText('meaning', value)}
          placeholder="뜻을 입력하세요"
          onFocus={() => setShowWCTemplate(false)}
        />
        <TextInput
          multiline
          style={[
            styles.textInput,
            {color: textPrimary, borderColor: cardBorderLine},
          ]}
          value={textVal.explanation}
          onChangeText={value => handleChangeText('explanation', value)}
          placeholder="메모를 입력하세요"
          placeholderTextColor={ongoingState}
          onFocus={() => setShowWCTemplate(false)}
        />
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={() => handleUpdateVoca(textVal, currentWC)}
            style={[styles.completeButton, {backgroundColor: iconPrimary}]}>
            <Text style={[styles.completeText, {color: background}]}>
              수정하기
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={
          showWCTemplate
            ? {...styles.wordclassBox, backgroundColor: transparentContentBack}
            : styles.wordclassBoxNone
        }>
        <TouchableOpacity
          onPress={() => setShowWCTemplate(false)}
          style={styles.closeButton}>
          <SvgIcon
            name="Cross"
            size={styles.closeIcon.width}
            fill={textPrimary}
          />
        </TouchableOpacity>
        {getFilteredWC().map((wc: string) => (
          <TouchableOpacity
            key={wc}
            onPress={() => setCurrentWC(prev => [...prev, wc])}
            style={[
              styles.classIconWrapper,
              styles.wcButton,
              {backgroundColor: iconPrimary},
            ]}>
            <Text style={[styles.classIconText, {color: background}]}>
              {wc}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default EditVocaPage;
