import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../styles/SearchPageStyle';
import images from '../styles/images';
import {lightTheme} from '../styles/colors';
import {RootStackParamList} from '../navigation/RootNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useDebounce from '../hooks/debounce';
import useDidMountEffect from '../hooks/didMount';
import {useRealm} from '../../RealmConfigContext';
import {searchWord} from '../service/selectData';
import Voca from '../model/Voca';

type SearchPageProps = NativeStackScreenProps<RootStackParamList, 'SearchPage'>;

function SearchPage({navigation}: SearchPageProps): JSX.Element {
  const {redArrow, pencilWithZh} = images.module;
  const {goBack, navigate} = navigation;
  const realm = useRealm();
  const [input, setInput] = useState('');
  const [searchedWords, setSearchedWords] = useState<Voca[]>([]);
  const debouncedInput = useDebounce(input, 500);

  useDidMountEffect(() => {
    console.log('input:: ', input);
    const result = searchWord(realm, input);
    setSearchedWords([...result]);
  }, [debouncedInput]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.inputWrapper}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image style={styles.pencilWithZhImg} source={redArrow} />
        </TouchableOpacity>
        <TextInput
          value={input}
          onChangeText={setInput}
          autoFocus
          placeholder="단어를 검색해보세요!"
          placeholderTextColor={lightTheme.ligthGray}
          style={styles.input}
        />
        <Image style={styles.pencilWithZhImg} source={pencilWithZh} />
      </View>
      <ScrollView style={styles.scrollView}>
        {searchedWords.map(({_id, word, intonation, meaning, level}) => (
          <TouchableOpacity
            onPress={() => navigate('WordDetailPage', {id: _id})}
            style={styles.resultBar}
            key={_id}>
            <Text style={styles.text}>{word}</Text>
            <Text style={styles.text}>{intonation}</Text>
            <Text
              style={styles.meaningText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {meaning}
            </Text>
            <Text style={styles.levelText}>{level}급</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SearchPage;
