import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../styles/BusuPageStyle';
import NavBar from '../module/NavBar';
import {lightTheme} from '../styles/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useQuery, useRealm} from '../../RealmConfigContext';

import {BusuStackParamList} from '../navigation/BusuNavigation';
import Busu from '../model/Busu';
import Card from '../module/Card';
import cardStyles from '../styles/BusuCardStyle';
import images from '../styles/images';
import {updateBusuBookmark} from '../service/updateData';

type BusuPageProps = NativeStackScreenProps<BusuStackParamList, 'BusuPage'>;

function BusuPage({navigation, route}: BusuPageProps): JSX.Element {
  const {goBack, navigate} = navigation;
  const {stroke} = route.params;

  const realm = useRealm();

  const busues = useQuery<Busu>('Busu', data => {
    return data.filtered('stroke == $0', stroke);
  });
  const {book, lanternOff, lanternOn} = images.module;

  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        goBack={goBack}
        title={`부수 ${stroke}획`}
        theme={lightTheme.darkRed}
      />
      <FlatList
        style={styles.flatlist}
        data={busues}
        renderItem={({item, item: {_id, busu, yin, xunyin, bookmarked}}) => (
          <TouchableOpacity
            onPress={() => navigate('BusuDetailPage', {busuData: item})}
            activeOpacity={0.7}
            key={_id}>
            <Card noShadow={true} marginVertical={10} theme="white">
              <View style={cardStyles.imgWrapper}>
                <TouchableOpacity
                  onPress={() => navigate('BusuDetailPage', {busuData: item})}>
                  <Image style={cardStyles.img} source={book} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => updateBusuBookmark(realm, _id, !bookmarked)}>
                  <Image
                    style={cardStyles.img}
                    source={bookmarked ? lanternOn : lanternOff}
                  />
                </TouchableOpacity>
              </View>
              <Text style={cardStyles.busu}>{busu}</Text>
              <Text style={cardStyles.xunyin}>{xunyin}</Text>
              <Text style={cardStyles.yin}>[{yin}]</Text>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={({_id}) => _id.toString()}
      />
    </SafeAreaView>
  );
}

export default BusuPage;
