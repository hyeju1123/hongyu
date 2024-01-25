import React, {useEffect} from 'react';
import {ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SearchStackParamList} from '../navigation/SearchNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useUtil from '../hooks/util';
import {useVoca} from '../providers/VocaProvider';

import {wordListState} from '../recoil/WordListState';
import {useRecoilState, useResetRecoilState} from 'recoil';

import SvgIcon from '../module/SvgIcon';
import SearchedItem from './SearchedItem';
import DebouncedTextInput from '../module/DebouncedTextInput';

import styles from '../styles/search/SearchPageStyle';
import {lightTheme} from '../styles/colors';

type SearchPageProps = NativeStackScreenProps<
  SearchStackParamList,
  'SearchPage'
>;

function SearchPage({
  navigation: {goBack, navigate},
}: SearchPageProps): JSX.Element {
  const {convertToWord} = useUtil();
  const {getVocasBySearch} = useVoca();
  const [searchedWords, setSearchedWords] = useRecoilState(wordListState);
  const resetWordList = useResetRecoilState(wordListState);

  const handleSearch = (val: string) => {
    const result = getVocasBySearch(val).map(convertToWord);

    setSearchedWords([...result]);
  };

  const moveToDetailPage = (id: number, isBusu: boolean) => {
    navigate(isBusu ? 'BusuDetailPage' : 'VocaDetailPage', {id});
  };

  useEffect(() => {
    return () => {
      resetWordList();
    };
  }, [resetWordList]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.inputWrapper}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <SvgIcon name="LineArrow" size={20} fill={lightTheme.red} />
        </TouchableOpacity>
        <DebouncedTextInput
          textVal={''}
          forSearch={true}
          style={styles.input}
          updateFn={handleSearch}
          placeholder="단어를 검색해보세요."
        />
        <SvgIcon name="PencilH" size={20} fill={lightTheme.red} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps={'handled'}>
        {searchedWords.map(({_id, word, isBusu}) => (
          <SearchedItem
            id={_id}
            key={_id + word}
            isBusu={isBusu}
            moveToDetailPage={moveToDetailPage}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default SearchPage;
