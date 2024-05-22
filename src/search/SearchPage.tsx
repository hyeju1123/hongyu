import React, {useCallback, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../navigation/StackParamListType';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useUtil from '../hooks/util';
import useToast from '../hooks/toast';
import {ToastIcon} from '../recoil/ToastState';
import {useVoca} from '../providers/VocaProvider';

import {Word, wordListState} from '../recoil/WordListState';
import {useRecoilState, useResetRecoilState} from 'recoil';

import SvgIcon from '../module/SvgIcon';
import SearchedItem from './SearchedItem';
import {FlashList} from '@shopify/flash-list';
import DebouncedTextInput from '../module/DebouncedTextInput';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/search/SearchPageStyle';

type SearchPageProps = NativeStackScreenProps<RootStackParamList, 'SearchPage'>;

function SearchPage({
  navigation: {goBack, navigate},
}: SearchPageProps): JSX.Element {
  const {
    colors: {background, iconPrimary, textPrimary},
  } = useTheme();
  const {convertToWord} = useUtil();
  const {fireToast} = useToast();
  const {getVocasBySearch} = useVoca();
  const [searchedWords, setSearchedWords] = useRecoilState(wordListState);
  const resetWordList = useResetRecoilState(wordListState);

  const handleSearch = (val: string) => {
    const result = getVocasBySearch(val).map(convertToWord).slice(0, 20);

    result.length === 0 && val !== ''
      ? fireToast({
          text: `'${val}'에 일치하는 단어가 없습니다`,
          icon: ToastIcon.AbNormal,
          remove: true,
        })
      : setSearchedWords([...result]);
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
    <SafeAreaView style={[styles.container, {backgroundColor: background}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
        <View
          style={[
            styles.inputWrapper,
            {borderBottomColor: iconPrimary},
            Platform.OS === 'ios' && styles.iosVerticalPadding,
          ]}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <SvgIcon
              name="MainArrow"
              fill={iconPrimary}
              size={styles.mainArrowIcon.width}
            />
          </TouchableOpacity>
          <DebouncedTextInput
            textVal={''}
            forSearch={true}
            style={[styles.input, {color: textPrimary}]}
            updateFn={handleSearch}
            placeholder="단어를 검색해보세요"
          />
          <SvgIcon
            name="Search"
            fill={iconPrimary}
            size={styles.searchIcon.width}
          />
        </View>
        <FlashList
          data={searchedWords}
          renderItem={renderItem}
          estimatedItemSize={40}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.flashlistContent}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SearchPage;
