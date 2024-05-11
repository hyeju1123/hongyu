import React, {useEffect} from 'react';
import {RootStackParamList} from '../../navigation/StackParamListType';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useRecoilValue} from 'recoil';
import {WordNav, wordNavState} from '../../recoil/WordNavState';

import CategoryPage from './CategoryPage';
import BookedCategoryPage from './BookedCategoryPage';

type CategoryBranchPageProps = NativeStackScreenProps<
  RootStackParamList,
  'CategoryBranchPage'
>;

function CategoryBranchPage({
  navigation,
}: CategoryBranchPageProps): JSX.Element {
  const {setOptions} = navigation;
  const {navType, level} = useRecoilValue(wordNavState);

  useEffect(() => {
    const headerTitle =
      navType === WordNav.Book
        ? '내 단어장'
        : navType === WordNav.Busu
        ? '부수'
        : `HSK ${level}급`;
    setOptions({headerTitle});
  }, [setOptions, navType, level]);

  return (
    <>
      {navType === WordNav.Book ? (
        <BookedCategoryPage navigation={navigation} />
      ) : (
        <CategoryPage navigation={navigation} />
      )}
    </>
  );
}

export default CategoryBranchPage;
