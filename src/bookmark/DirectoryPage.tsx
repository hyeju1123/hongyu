import React from 'react';
import {ScrollView, StatusBar, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../styles/CategoryPageStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BookmarkStackParamList} from '../navigation/BookmarkNavigation';
import NavBar from '../module/NavBar';
import {lightTheme} from '../styles/colors';
import {useQuery} from '../context/RealmConfigContext';
import Voca from '../model/Voca';
import Card from '../module/Card';

type DirectoryPageProps = NativeStackScreenProps<
  BookmarkStackParamList,
  'DirectoryPage'
>;

type CountObject = {
  [level: number]: number;
};

function DirectoryPage({navigation}: DirectoryPageProps): JSX.Element {
  const {goBack, navigate} = navigation;
  const bookmarked = useQuery<Voca>('Voca', vocas => {
    return vocas.filtered('bookmarked == $0', true);
  });

  const levelCounts = bookmarked.reduce((counts: CountObject, item) => {
    const level = item.level;
    counts[level] = (counts[level] || 0) + 1;
    return counts;
  }, {});

  const injectContent = (title: string, count: number, key: string) => (
    <TouchableOpacity
      key={key}
      activeOpacity={0.7}
      onPress={() =>
        navigate('WordPage', {
          level: Number(key),
          category: title,
          fromBookmark: true,
        })
      }>
      <Card marginVertical={10} theme="white">
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.bottomText}>
          단어 {<Text style={styles.bottomRedText}>{count}</Text>}개
        </Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <NavBar goBack={goBack} title="내 단어장" theme={lightTheme.red} />
      <ScrollView style={styles.scrollView}>
        {injectContent('모든 단어', bookmarked.length, '0')}
        {Object.entries(levelCounts).map(([key, value]) =>
          injectContent(`${key}급`, value, key),
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default DirectoryPage;
