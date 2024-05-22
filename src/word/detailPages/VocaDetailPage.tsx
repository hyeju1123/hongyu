import React, {useEffect, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackParamListType';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import Card from '../../module/Card';
import SoundButton from '../../module/SoundButton';
import EditWordButton from '../../module/EditWordButton';
import DebouncedTextInput from '../../module/DebouncedTextInput';
import BookmarkButton, {ButtonSize} from '../../module/BookmarkButton';

import {useRecoilCallback, useRecoilValue} from 'recoil';
import {vocaState} from '../../recoil/WordListState';
import {useVoca} from '../../providers/VocaProvider';

import {useTheme} from '@react-navigation/native';
import styles from '../../styles/word/WordDetailPageStyle';

type VocaDetailPageProps = NativeStackScreenProps<
  RootStackParamList,
  'VocaDetailPage'
>;

function VocaDetailPage({
  navigation,
  route: {
    params: {id},
  },
}: VocaDetailPageProps): JSX.Element {
  const {
    colors: {transparent, background, textPrimary, iconPrimary},
  } = useTheme();
  const wordItem = useRecoilValue(vocaState(id));
  const {
    word,
    intonation,
    bookmarked,
    wordclass,
    meaning,
    level,
    explanation,
    isBusu,
  } = wordItem;
  const {updateExplanation} = useVoca();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleExplanation = useRecoilCallback(
    ({set}) =>
      (text: string) => {
        updateExplanation(id, text);
        set(vocaState(id), {...wordItem, explanation: text});
      },
    [wordItem],
  );

  useEffect(() => {
    const getEditButton = () => {
      return <EditWordButton navigation={navigation} id={id} />;
    };

    navigation.setOptions({
      headerRight: getEditButton,
    });
  }, [navigation, id]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={60}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
          <Card showShadow underColor={transparent} marginVertical={8}>
            <SoundButton level={level} word={word} />
            <Text
              style={
                word.length > 3
                  ? {...styles.longWord, color: textPrimary}
                  : {...styles.word, color: textPrimary}
              }>
              {word}
            </Text>
            <Text style={[styles.intonation, {color: iconPrimary}]}>
              {intonation}
            </Text>
          </Card>
          <Card showShadow underColor={transparent} marginVertical={8}>
            <View style={styles.flexDirRow}>
              {wordclass.split(', ').map((wc: string) => (
                <View
                  key={wc}
                  style={[
                    styles.classIconWrapper,
                    {backgroundColor: iconPrimary},
                  ]}>
                  <Text style={[{color: background}, styles.classIconText]}>
                    {wc}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
          <Card showShadow underColor={transparent} marginVertical={8}>
            <Text style={[styles.meaning, {color: textPrimary}]}>
              {meaning}
            </Text>
          </Card>
          <Card showShadow underColor={transparent} marginVertical={8}>
            <DebouncedTextInput
              style={[styles.meaning, {color: textPrimary}]}
              textVal={explanation || ''}
              placeholder="# 메모를 남겨보세요."
              updateFn={val => handleExplanation(val)}
            />
          </Card>
          <View style={styles.bookmarkButtonWrapper}>
            <BookmarkButton
              id={id}
              word={word}
              isBusu={isBusu}
              size={ButtonSize.Large}
              bookmarked={bookmarked}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default VocaDetailPage;
