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
import useToast from '../hooks/toast';
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
import {limitTextLength} from '../service/util';

type WordDetailPageProps = NativeStackScreenProps<
  HskStackParamList | BookmarkStackParamList,
  'WordDetailPage'
>;

function WordDetailPage({navigation, route}: WordDetailPageProps): JSX.Element {
  const {id} = route.params;
  const {goBack} = navigation;
  const realm = useRealm();

  const isFocused = useIsFocused();

  const wordData = useMemo(() => {
    if (isFocused) {
      return selectWord(realm, id);
    }
    return getDefaultWord();
  }, [realm, id, isFocused]);
  const [exToChange, setExToChange] = useState(wordData?.explanation || '');
  const [bookmark, setBookmark] = useState(wordData?.bookmarked);
  const debouncedEx: string = useDebounce(exToChange, 1000);
  const {fireToast} = useToast();

  useDidMountEffect(() => {
    if (wordData.explanation !== exToChange) {
      if (!limitTextLength(debouncedEx, fireToast)) {
        updateExplanation(realm, id, debouncedEx);
        fireToast({
          text: '메모가 저장되었습니다',
          icon: 'checkedGreen',
          remove: true,
        });
      }
    }
  }, [debouncedEx, id, realm]);

  useDidMountEffect(() => {
    if (isFocused) {
      setExToChange(wordData.explanation || '');
    }
  }, [wordData, isFocused]);

  const {
    wordClass,
    module: {lanternOffWhite, lanternOn, sound},
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
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            style={styles.scrollView}>
            <InfoCard>
              <TouchableOpacity style={styles.soundButton}>
                <Image style={styles.sound} source={sound} />
              </TouchableOpacity>
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
                multiline
                style={styles.meaning}
                value={exToChange}
                onChangeText={setExToChange}
                placeholder="# 메모를 남겨보세요."
                placeholderTextColor={lightTheme.gray}
              />
              <Text style={styles.limitText}>{exToChange.length} / 250</Text>
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
