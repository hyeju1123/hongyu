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

type WordPageProps = NativeStackScreenProps<HskStackParamList, 'WordPage'>;

function WordPage({navigation, route}: WordPageProps): JSX.Element {
  const {goBack} = navigation;
  const {level, category} = route.params;

  const words = useQuery<Voca>('Voca', vocas => {
    return vocas.filtered('level == $0 && theme == $1', level, category);
  });

  return (
    <SafeAreaView style={styles.container}>
      <NavBar goBack={goBack} title={category} theme={lightTheme.red} />
      <FlatList
        style={styles.flatlist}
        data={words}
        renderItem={({item}) => <WordCard wordData={item} />}
        keyExtractor={({_id}) => _id.toString()}
      />
    </SafeAreaView>
  );
}

export default WordPage;
