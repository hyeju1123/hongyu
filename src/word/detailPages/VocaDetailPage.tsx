import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WordStackParamList} from '../../navigation/WordNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, ScrollView, Text, View} from 'react-native';

import Card from '../../module/Card';
import SoundButton from '../../module/SoundButton';
import DebouncedTextInput from '../../module/DebouncedTextInput';
import BookmarkButton, {ButtonSize} from '../../module/BookmarkButton';

import {useRecoilCallback, useRecoilValue} from 'recoil';
import {vocaState} from '../../recoil/WordListState';
import {useVoca} from '../../providers/VocaProvider';

import images from '../../styles/images';
import styles from '../../styles/word/WordDetailPageStyle';
import EditWordButton from '../../module/EditWordButton';

type VocaDetailPageProps = NativeStackScreenProps<
  WordStackParamList,
  'VocaDetailPage'
>;

function VocaDetailPage({
  navigation,
  route: {
    params: {id},
  },
}: VocaDetailPageProps): JSX.Element {
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

  const handleExplanation = useRecoilCallback(
    ({set}) =>
      (text: string) => {
        updateExplanation(id, text);
        set(vocaState(id), {...wordItem, explanation: text});
      },
    [wordItem],
  );

  const {wordClass} = images;

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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <Card shadow underdressing={false} marginVertical={8}>
          <SoundButton level={level} word={word} />
          <Text style={word.length > 3 ? styles.longWord : styles.word}>
            {word}
          </Text>
          <Text style={styles.intonation}>{intonation}</Text>
        </Card>
        <Card shadow underdressing={false} marginVertical={8}>
          <View style={styles.flexDirRow}>
            {wordclass.split(', ').map((wc: string) => (
              <Image
                style={styles.wordclassImg}
                key={wc}
                source={wordClass[wc]}
              />
            ))}
          </View>
        </Card>
        <Card shadow underdressing={false} marginVertical={8}>
          <Text style={styles.meaning}>{meaning}</Text>
        </Card>
        <Card shadow underdressing={false} marginVertical={8}>
          <DebouncedTextInput
            style={styles.meaning}
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

export default VocaDetailPage;
