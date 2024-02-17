import React, {useCallback, useEffect} from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SearchStackParamList} from '../navigation/SearchNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useUtil from '../hooks/util';
import {useVoca} from '../providers/VocaProvider';

import {Word, wordListState} from '../recoil/WordListState';
import {useRecoilState, useResetRecoilState} from 'recoil';

import SvgIcon from '../module/SvgIcon';
import SearchedItem from './SearchedItem';
import DebouncedTextInput from '../module/DebouncedTextInput';

import styles from '../styles/search/SearchPageStyle';
import {lightTheme} from '../styles/colors';
import {FlashList} from '@shopify/flash-list';
import iconSize from '../styles/iconSize';

type SearchPageProps = NativeStackScreenProps<
  SearchStackParamList,
  'SearchPage'
>;

function SearchPage({
  navigation: {goBack, navigate},
}: SearchPageProps): JSX.Element {
  const {search, mainArrow} = iconSize;
  const {convertToWord} = useUtil();
  const {getVocasBySearch} = useVoca();
  const [searchedWords, setSearchedWords] = useRecoilState(wordListState);
  const resetWordList = useResetRecoilState(wordListState);

  const handleSearch = (val: string) => {
    const result = getVocasBySearch(val).map(convertToWord).slice(0, 20);

    setSearchedWords([...result]);
  };

  const moveToDetailPage = useCallback(
    (id: number, isBusu: boolean) => {
      navigate(isBusu ? 'BusuDetailPage' : 'VocaDetailPage', {id});
    },
    [navigate],
  );

  const renderItem = useCallback(
    ({item: {_id, isBusu}}: {item: Word}) => (
      <SearchedItem
        id={_id}
        isBusu={isBusu}
        moveToDetailPage={moveToDetailPage}
      />
    ),
    [moveToDetailPage],
  );

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
          <SvgIcon name="MainArrow" size={mainArrow} fill={lightTheme.red} />
        </TouchableOpacity>
        <DebouncedTextInput
          textVal={''}
          forSearch={true}
          style={styles.input}
          updateFn={handleSearch}
          placeholder="단어를 검색해보세요"
        />
        <SvgIcon name="Search" size={search} fill={lightTheme.red} />
      </View>
      <FlashList
        data={searchedWords}
        renderItem={renderItem}
        estimatedItemSize={40}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.flashlistContent}
      />
    </SafeAreaView>
  );
}

export default SearchPage;
