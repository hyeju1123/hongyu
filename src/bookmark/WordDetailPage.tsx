import React, {useEffect, useState} from 'react';
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
import Card from '../module/Card';
import EditWordButton from '../module/EditWordButton';
import DebouncedTextInput from '../module/DebouncedTextInput';

import useUtil from '../hooks/util';
import usePolly from '../hooks/polly';
import {useVoca} from '../providers/VocaProvider';
import useDidMountEffect from '../hooks/didMount';
import {useIsFocused} from '@react-navigation/native';

import images from '../styles/images';
import styles from '../styles/WordDetailPageStyle';

type WordDetailPageProps = NativeStackScreenProps<
  RootStackParamList | HskStackParamList | BookmarkStackParamList,
  'WordDetailPage'
>;

function WordDetailPage({navigation, route}: WordDetailPageProps): JSX.Element {
  const {id} = route.params;

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

  useEffect(() => {
    const getEditButton = () => {
      return <EditWordButton navigation={navigation} id={id} />;
    };

    navigation.setOptions({
      headerRight: getEditButton,
    });
  }, [navigation, id]);

  useDidMountEffect(() => {
    if (isFocused) {
      const newData = getVoca(id);
      setWordData(newData);
    }
  }, [isFocused, getVoca, id]);

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
            updateFn={val => updateExplanation(id, val)}
          />
        </Card>
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
