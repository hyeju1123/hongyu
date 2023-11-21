import React, {useMemo, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HskStackParamList} from '../navigation/HskNavigation';
import {BookmarkStackParamList} from '../navigation/BookmarkNavigation';
import {useRealm} from '../context/RealmConfigContext';
import {useIsFocused} from '@react-navigation/native';
import useDebounce from '../hooks/debounce';
import useDidMountEffect from '../hooks/didMount';
import {selectWord, getDefaultWord} from '../service/selectData';
import {updateBookmark, updateExplanation} from '../service/updateData';
import NavBar from '../module/NavBar';
import InfoCard from '../module/InfoCard';
import EditWordButton from '../module/EditWordButton';
import images from '../styles/images';
import {lightTheme} from '../styles/colors';
import styles from '../styles/WordDetailPageStyle';
import LoadingPage from '../module/LoadingPage';

type WordDetailPageProps = NativeStackScreenProps<
  HskStackParamList | BookmarkStackParamList,
  'WordDetailPage'
>;

function WordDetailPage({navigation, route}: WordDetailPageProps): JSX.Element {
  const {id} = route.params;
  const {goBack} = navigation;
  const realm = useRealm();

  const isFocused = useIsFocused();
  console.log('isFocused: ', isFocused);

  const wordData = useMemo(() => {
    if (isFocused) {
      return selectWord(realm, id);
    }
    return getDefaultWord();
  }, [realm, id, isFocused]);
  const [exToChage, setExToChange] = useState(wordData?.explanation || '');
  const [bookmark, setBookmark] = useState(wordData?.bookmarked);
  const debouncedEx = useDebounce(exToChage, 1000);

  console.log('wordData: ', wordData);

  useDidMountEffect(
    () => {
      console.log('hello');
      updateExplanation(realm, id, debouncedEx);
    },
    [debouncedEx, id, realm],
    () => {
      console.log('bye');
    },
  );

  const {
    wordClass,
    module: {lanternOffWhite, lanternOn},
  } = images;
  const {word, intonation, wordclass, meaning, bookmarked} = wordData;

  const handleBookmark = () => {
    setBookmark(!bookmark);
    updateBookmark(realm, id, !bookmarked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {wordData ? (
        <>
          <NavBar
            goBack={goBack}
            title={'상세보기'}
            theme={lightTheme.red}
            rightButton={<EditWordButton navigation={navigation} id={id} />}
          />
          <ScrollView style={styles.scrollView}>
            <InfoCard>
              <Text style={styles.word}>{word}</Text>
              <Text style={styles.intonation}>{intonation}</Text>
            </InfoCard>
            <InfoCard>
              <View style={styles.rowWrapper}>
                {wordclass.split(', ').map((wc: string) => (
                  <Image
                    style={styles.wordclassImg}
                    key={wc}
                    source={wordClass[wc]}
                  />
                ))}
              </View>
            </InfoCard>
            <InfoCard>
              <Text style={styles.meaning}>{meaning}</Text>
            </InfoCard>
            <InfoCard>
              <TextInput
                style={styles.meaning}
                value={exToChage}
                onChangeText={setExToChange}
                placeholder="# 메모를 남겨보세요."
              />
            </InfoCard>
            <TouchableOpacity
              onPress={handleBookmark}
              style={styles.bookmarkBtn}>
              <Image
                style={styles.bookmarkImg}
                source={bookmark ? lanternOn : lanternOffWhite}
              />
            </TouchableOpacity>
          </ScrollView>
        </>
      ) : (
        <LoadingPage />
      )}
    </SafeAreaView>
  );
}

export default WordDetailPage;
