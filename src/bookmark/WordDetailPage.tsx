import React, {useState} from 'react';
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
import Voca from '../model/Voca';
import NavBar from '../module/NavBar';
import InfoCard from '../module/InfoCard';
import EditWordButton from '../module/EditWordButton';
import DebouncedTextInput from '../module/DebouncedTextInput';

import useUtil from '../hooks/util';
import usePolly from '../hooks/polly';
import {useVoca} from '../providers/VocaProvider';
import useDidMountEffect from '../hooks/didMount';
import {useIsFocused} from '@react-navigation/native';

import images from '../styles/images';
import {lightTheme} from '../styles/colors';
import styles from '../styles/WordDetailPageStyle';

type WordDetailPageProps = NativeStackScreenProps<
  RootStackParamList | HskStackParamList | BookmarkStackParamList,
  'WordDetailPage'
>;

function WordDetailPage({navigation, route}: WordDetailPageProps): JSX.Element {
  const {id} = route.params;
  const {goBack} = navigation;

  const {setToggle} = usePolly();
  const isFocused = useIsFocused();
  const {handleBookmark} = useUtil();
  const {getVoca, updateExplanation} = useVoca();
  const [wordData, setWordData] = useState<Voca>(getVoca(id));
  const [bookmark, setBookmark] = useState(wordData.bookmarked);

  const {word, intonation, wordclass, meaning, level, explanation} = wordData;

  const {
    wordClass,
    module: {lanternOffWhite, lanternOn, sound},
  } = images;

  useDidMountEffect(() => {
    if (isFocused) {
      const newData = getVoca(id);
      setWordData(newData);
    }
  }, [isFocused, getVoca, id]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
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
          <TouchableOpacity
            onPress={() => setToggle({word, level})}
            style={styles.soundButton}>
            <Image style={styles.sound} source={sound} />
          </TouchableOpacity>
          <Text style={word.length > 3 ? styles.longWord : styles.word}>
            {word}
          </Text>
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
          <DebouncedTextInput
            style={styles.meaning}
            textVal={explanation || ''}
            placeholder="# 메모를 남겨보세요."
            updateFn={val => updateExplanation(id, val)}
          />
        </InfoCard>
        <TouchableOpacity
          onPress={() => handleBookmark({setBookmark, _id: id, word, bookmark})}
          style={styles.bookmarkBtn}>
          <Image
            style={styles.bookmarkImg}
            source={bookmark ? lanternOn : lanternOffWhite}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default WordDetailPage;
