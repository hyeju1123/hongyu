import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StatusBar, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BookmarkStackParamList} from '../navigation/BookmarkNavigation';
import Card from '../module/Card';

import {useVoca} from '../providers/VocaProvider';
import useDidMountEffect from '../hooks/didMount';
import {useIsFocused} from '@react-navigation/native';

import styles from '../styles/CategoryPageStyle';

type DirectoryPageProps = NativeStackScreenProps<
  BookmarkStackParamList,
  'DirectoryPage'
>;

type CountObject = {
  [level: number]: number;
};

function DirectoryPage({navigation}: DirectoryPageProps): JSX.Element {
  const {navigate} = navigation;
  const isFocused = useIsFocused();
  const {getBookmarkedVocas, getBookmarkedBusues} = useVoca();
  const [bookmarked, setBookmarked] = useState(getBookmarkedVocas(0));
  const [bookmarkedBusues, setBookmarkedBusues] = useState(
    getBookmarkedBusues(),
  );

  const levelCounts = bookmarked.reduce((counts: CountObject, item) => {
    const level = item.level;
    counts[level] = (counts[level] || 0) + 1;
    return counts;
  }, {});

  const handlePage = (busu: boolean, title: string, key: string) => {
    if (busu) {
      return () => {
        navigate('BusuPage', {stroke: 0, fromBookmark: true});
      };
    } else {
      return () => {
        navigate('WordPage', {
          level: Number(key),
          category: title,
          fromBookmark: true,
        });
      };
    }
  };

  const injectContent = (
    title: string,
    count: number,
    key: string,
    busu: boolean = false,
  ) => {
    return (
      <TouchableOpacity key={key} onPress={handlePage(busu, title, key)}>
        <Card marginVertical={10} theme="white">
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.bottomText}>
            {busu ? '부수' : '단어'}{' '}
            {<Text style={styles.bottomRedText}>{count}</Text>}개
          </Text>
        </Card>
      </TouchableOpacity>
    );
  };

  useDidMountEffect(() => {
    setBookmarked(getBookmarkedVocas(0));
    setBookmarkedBusues(getBookmarkedBusues());
  }, [isFocused]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView style={styles.scrollView}>
        {injectContent('부수', bookmarkedBusues.length, '-1', true)}
        {injectContent('HSK 모든 단어', bookmarked.length, '0')}
        {Object.entries(levelCounts).map(([key, value]) =>
          injectContent(`HSK ${key}급`, value, key),
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default DirectoryPage;
