import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../styles/WordPageStyle';
import NavBar from '../module/NavBar';
import {lightTheme} from '../styles/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HskStackParamList} from '../navigation/HskNavigation';
import WordCard from '../module/WordCard';
import {FlatList} from 'react-native';
import {useQuery} from '../context/RealmConfigContext';
import Voca from '../model/Voca';
import {BookmarkStackParamList} from '../navigation/BookmarkNavigation';

type WordPageProps = NativeStackScreenProps<
  HskStackParamList | BookmarkStackParamList,
  'WordPage'
>;

function WordPage({navigation, route}: WordPageProps): JSX.Element {
  const {goBack, navigate} = navigation;
  const {level, category, fromBookmark} = route.params;

  const words = useQuery<Voca>('Voca', vocas => {
    return fromBookmark
      ? level === 0
        ? vocas.filtered('bookmarked == $0', true)
        : vocas.filtered('level == $0 && bookmarked == $1', level, true)
      : vocas.filtered('level == $0 && theme == $1', level, category);
  });

  const moveToDetailPage = (id: number) => {
    navigate('WordDetailPage', {id});
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar goBack={goBack} title={category} theme={lightTheme.red} />
      <FlatList
        style={styles.flatlist}
        data={words}
        renderItem={({item}) => (
          <WordCard navigate={moveToDetailPage} wordData={item} />
        )}
        keyExtractor={({_id}) => _id.toString()}
      />
    </SafeAreaView>
  );
}

export default WordPage;
