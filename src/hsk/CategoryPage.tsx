import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, StatusBar, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HskStackParamList} from '../navigation/HskNavigation';
import Card from '../module/Card';

import useUtil from '../hooks/util';
import {useVoca} from '../providers/VocaProvider';

import styles from '../styles/CategoryPageStyle';

type CategoryPageProps = NativeStackScreenProps<
  HskStackParamList,
  'CategoryPage'
>;

function CategoryPage({navigation, route}: CategoryPageProps): JSX.Element {
  const {navigate} = navigation;
  const {level} = route.params;
  const {getVocasByLevel} = useVoca();
  const filteredTheme = getVocasByLevel(level);
  const {items, loadData} = useUtil(filteredTheme);

  useEffect(() => {
    navigation.setOptions({headerTitle: `HSK ${level}급`});
  }, [navigation, level]);

  return (
    <SafeAreaView edges={['bottom']} style={[styles.container]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <FlatList
        style={[styles.scrollView]}
        data={items}
        renderItem={({item: {_id, theme}}) => (
          <TouchableOpacity
            key={_id}
            onPress={() => navigate('WordPage', {level, category: theme})}>
            <Card marginVertical={10} theme="white">
              <Text style={styles.text}>{theme}</Text>
            </Card>
          </TouchableOpacity>
        )}
        onEndReached={loadData}
        onEndReachedThreshold={0.8}
      />
    </SafeAreaView>
  );
}

export default CategoryPage;
