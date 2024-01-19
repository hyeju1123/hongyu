import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../navigation/RootNavigation';
import {HskStackParamList} from '../navigation/HskNavigation';
import {BookmarkStackParamList} from '../navigation/BookmarkNavigation';

import Card from '../module/Card';
import EditWordButton from '../module/EditWordButton';
import DebouncedTextInput from '../module/DebouncedTextInput';

import usePolly from '../hooks/polly';
import {useVoca} from '../providers/VocaProvider';

import images from '../styles/images';
import styles from '../styles/WordDetailPageStyle';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {vocaState} from '../recoil/WordListState';
import BookmarkButton, {ButtonSize} from '../module/BookmarkButton';

type WordDetailPageProps = NativeStackScreenProps<
  RootStackParamList | HskStackParamList | BookmarkStackParamList,
  'WordDetailPage'
>;

function WordDetailPage({
  navigation,
  route: {
    params: {id},
  },
}: WordDetailPageProps): JSX.Element {
  const wordItem = useRecoilValue(vocaState(id));
  const {word, intonation, bookmarked, wordclass, meaning, level, explanation} =
    wordItem;
  const {setToggle} = usePolly();
  const {updateExplanation} = useVoca();

  const handleExplanation = useRecoilCallback(
    ({set}) =>
      (text: string) => {
        updateExplanation(id, text);
        set(vocaState(id), {...wordItem, explanation: text});
      },
    [wordItem],
  );

  const {
    wordClass,
    module: {sound},
  } = images;

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
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}>
        <Card
          shadow
          underdressing={false}
          marginVertical={8}
          paddingVertical={15}
          paddingHorizontal={15}>
          <TouchableOpacity
            onPress={() => setToggle({word, level})}
            style={styles.soundButton}>
            <Image style={styles.sound} source={sound} />
          </TouchableOpacity>
          <Text style={word.length > 3 ? styles.longWord : styles.word}>
            {word}
          </Text>
          <Text style={styles.intonation}>{intonation}</Text>
        </Card>
        <Card
          shadow
          underdressing={false}
          marginVertical={8}
          paddingVertical={15}
          paddingHorizontal={15}>
          <View style={styles.rowWrapper}>
            {wordclass.split(', ').map((wc: string) => (
              <Image
                style={styles.wordclassImg}
                key={wc}
                source={wordClass[wc]}
              />
            ))}
          </View>
        </Card>
        <Card
          shadow
          underdressing={false}
          marginVertical={8}
          paddingVertical={18}
          paddingHorizontal={15}>
          <Text style={styles.meaning}>{meaning}</Text>
        </Card>
        <Card
          shadow
          underdressing={false}
          paddingVertical={15}
          marginVertical={8}>
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
            size={ButtonSize.Large}
            bookmarked={bookmarked}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default WordDetailPage;
