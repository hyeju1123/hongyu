import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WordStackParamList} from '../../navigation/WordNavigation';
import {SearchStackParamList} from '../../navigation/SearchNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text, View} from 'react-native';
import Card from '../../module/Card';
import DebouncedTextInput from '../../module/DebouncedTextInput';
import BookmarkButton, {ButtonSize} from '../../module/BookmarkButton';

import {useRecoilCallback, useRecoilValue} from 'recoil';
import {busuState} from '../../recoil/WordListState';
import {useVoca} from '../../providers/VocaProvider';

import {useTheme} from '@react-navigation/native';
import styles from '../../styles/word/WordDetailPageStyle';

type BusuDetailPageProps = NativeStackScreenProps<
  WordStackParamList | SearchStackParamList,
  'BusuDetailPage'
>;

function BusuDetailPage({
  route: {
    params: {id},
  },
}: BusuDetailPageProps): JSX.Element {
  const {
    colors: {transparent, textPrimary, iconPrimary, primary},
  } = useTheme();
  const wordItem = useRecoilValue(busuState(id));
  const {
    word,
    intonation,
    bookmarked,
    wordclass,
    meaning,
    isBusu,
    explanation,
    info,
  } = wordItem;
  const {updateBusuExplanation} = useVoca();

  const handleExplanation = useRecoilCallback(
    ({set}) =>
      (text: string) => {
        updateBusuExplanation(id, text);
        set(busuState(id), {...wordItem, explanation: text});
      },
    [wordItem],
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <Card showShadow underColor={transparent} marginVertical={8}>
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
          <Text style={[styles.xunyin, {color: textPrimary}]}>{meaning}</Text>
        </Card>
        <Card showShadow underColor={transparent} marginVertical={8}>
          <Text style={[styles.busuSubTitle, {color: primary}]}>
            # 부수 정보
          </Text>
          <Text style={[styles.meaning, {color: textPrimary}]}>{info}</Text>
        </Card>
        <Card showShadow underColor={transparent} marginVertical={8}>
          <Text style={[styles.busuSubTitle, {color: primary}]}># 예시</Text>
          <Text style={[styles.meaning, {color: textPrimary}]}>
            {wordclass}
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
    </SafeAreaView>
  );
}

export default BusuDetailPage;
