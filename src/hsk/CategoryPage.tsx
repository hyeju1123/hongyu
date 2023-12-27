import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, StatusBar, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HskStackParamList} from '../navigation/HskNavigation';
import Card from '../module/Card';
import NavBar from '../module/NavBar';

import useUtil from '../hooks/util';
import {useVoca} from '../providers/VocaProvider';

import styles from '../styles/CategoryPageStyle';
import {lightTheme} from '../styles/colors';

type CategoryPageProps = NativeStackScreenProps<
  HskStackParamList,
  'CategoryPage'
>;

function CategoryPage({navigation, route}: CategoryPageProps): JSX.Element {
  const {level} = route.params;
  const {getVocasByLevel} = useVoca();
  const {goBack, navigate} = navigation;
  const filteredTheme = getVocasByLevel(level);
  const {items, loadData} = useUtil(filteredTheme);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <NavBar goBack={goBack} title={`HSK ${level}급`} theme={lightTheme.red} />
      <FlatList
        style={styles.scrollView}
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
