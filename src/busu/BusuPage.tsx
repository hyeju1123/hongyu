import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native';
import {BusuStackParamList} from '../navigation/BusuNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BookmarkStackParamList} from '../navigation/BookmarkNavigation';

import NavBar from '../module/NavBar';
import BusuCard from './BusuCard';
import Busu from '../model/Busu';

import useUtil from '../hooks/util';
import {useVoca} from '../providers/VocaProvider';

import {lightTheme} from '../styles/colors';
import styles from '../styles/BusuPageStyle';

type BusuPageProps = NativeStackScreenProps<
  BusuStackParamList | BookmarkStackParamList,
  'BusuPage'
>;

function BusuPage({navigation, route}: BusuPageProps): JSX.Element {
  const {stroke, fromBookmark} = route.params;
  const {goBack, navigate} = navigation;
  const {getBusuesByStroke, getBookmarkedBusues} = useVoca();
  const busues = fromBookmark
    ? getBookmarkedBusues()
    : getBusuesByStroke(stroke);
  const {items, loadData} = useUtil(busues);

  const moveToDetailPage = (item: Busu) => {
    navigate('BusuDetailPage', {busuData: item});
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        goBack={goBack}
        title={`부수 ${stroke !== 0 ? stroke + '획' : ''}`}
        theme={lightTheme.darkRed}
      />
      <FlatList
        style={styles.flatlist}
        data={items}
        renderItem={({item}) => (
          <BusuCard
            key={item._id}
            busuData={item}
            moveToDetailPage={moveToDetailPage}
          />
        )}
        onEndReached={loadData}
        onEndReachedThreshold={0.8}
      />
    </SafeAreaView>
  );
}

export default BusuPage;
