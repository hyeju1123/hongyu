import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../navigation/RootNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useVoca} from '../providers/VocaProvider';
import Voca from '../model/Voca';
import Busu from '../model/Busu';
import DebouncedTextInput from '../module/DebouncedTextInput';

import images from '../styles/images';
import styles from '../styles/SearchPageStyle';

type SearchPageProps = NativeStackScreenProps<RootStackParamList, 'SearchPage'>;

function SearchPage({navigation}: SearchPageProps): JSX.Element {
  const {getVocasBySearch} = useVoca();
  const {goBack, navigate} = navigation;
  const {redArrow, pencilWithZh} = images.module;
  const [searchedWords, setSearchedWords] = useState<(Busu | Voca)[]>([]);

  const handleSearch = (val: string) => {
    const result = getVocasBySearch(val);
    setSearchedWords([...result]);
  };

  const handleData = (item: Busu | Voca) => {
    if (item instanceof Voca) {
      return (
        <TouchableOpacity
          onPress={() => navigate('WordDetailPage', {id: item._id})}
          style={styles.resultBar}
          key={item._id}>
          <Text style={styles.text}>{item.word}</Text>
          <Text style={styles.text}>{item.intonation}</Text>
          <Text
            style={styles.meaningText}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.meaning}
          </Text>
          <Text style={styles.levelText}>{item.level}급</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => navigate('BusuDetailPage', {busuData: item})}
          style={styles.resultBar}
          key={item._id}>
          <Text style={styles.text}>{item.busu}</Text>
          <Text style={styles.text}>[{item.yin}]</Text>
          <Text
            style={styles.meaningText}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.xunyin}
          </Text>
          <Text style={styles.levelText}>{item.stroke}획</Text>
        </TouchableOpacity>
      );
    }
  };

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
        <DebouncedTextInput
          textVal={''}
          forSearch={true}
          style={styles.input}
          updateFn={handleSearch}
          placeholder="단어를 검색해보세요."
        />
        <Image style={styles.pencilWithZhImg} source={pencilWithZh} />
      </View>
      <ScrollView style={styles.scrollView}>
        {searchedWords.map(handleData)}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SearchPage;
