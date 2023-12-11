import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../styles/WordPageStyle';
import NavBar from '../module/NavBar';
import {lightTheme} from '../styles/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HskStackParamList} from '../navigation/HskNavigation';
import WordCard from '../module/WordCard';
import {FlatList} from 'react-native';
import {useQuery} from '../../RealmConfigContext';
import Voca from '../model/Voca';
import {BookmarkStackParamList} from '../navigation/BookmarkNavigation';
import useDebounce from '../hooks/debounce';
import useDidMountEffect from '../hooks/didMount';
import usePolly from '../hooks/polly';

type WordPageProps = NativeStackScreenProps<
  HskStackParamList | BookmarkStackParamList,
  'WordPage'
>;

function WordPage({navigation, route}: WordPageProps): JSX.Element {
  const {goBack, navigate} = navigation;
  const {level, category, fromBookmark} = route.params;
  const [soundToggle, setSoundToggle] = useState({word: '', value: 0});
  const debouncedToggle = useDebounce(soundToggle, 300);
  const {fetchPolly} = usePolly();

  useDidMountEffect(() => {
    fetchPolly(level, soundToggle.word);
  }, [debouncedToggle]);

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

  const handleSoundToggle = (word: string) => {
    setSoundToggle(prev => ({word, value: prev.value + 1}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar goBack={goBack} title={category} theme={lightTheme.red} />
      <FlatList
        style={styles.flatlist}
        data={words}
        renderItem={({item}) => (
          <WordCard
            navigate={moveToDetailPage}
            wordData={item}
            handleSoundToggle={handleSoundToggle}
          />
        )}
        keyExtractor={({_id}) => _id.toString()}
      />
    </SafeAreaView>
  );
}

export default WordPage;
