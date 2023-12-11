import React from 'react';
import {ScrollView, StatusBar, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../styles/CategoryPageStyle';
import Card from '../module/Card';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HskStackParamList} from '../navigation/HskNavigation';
import NavBar from '../module/NavBar';
import {lightTheme} from '../styles/colors';
import {useQuery} from '../../RealmConfigContext';
import Voca from '../model/Voca';

type CategoryPageProps = NativeStackScreenProps<
  HskStackParamList,
  'CategoryPage'
>;

function CategoryPage({navigation, route}: CategoryPageProps): JSX.Element {
  const {goBack, navigate} = navigation;
  const {level} = route.params;

  const filtered = useQuery<Voca>('Voca', vocas => {
    return vocas.filtered('level == $0 DISTINCT(theme)', level);
  });
  const filteredTheme = filtered.map(voca => voca.theme);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <NavBar goBack={goBack} title={`HSK ${level}급`} theme={lightTheme.red} />
      <ScrollView style={styles.scrollView}>
        {filteredTheme.map((category, idx) => (
          <TouchableOpacity
            onPress={() => navigate('WordPage', {level, category})}
            key={idx}>
            <Card marginVertical={10} theme="white">
              <Text style={styles.text}>{category}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default CategoryPage;
