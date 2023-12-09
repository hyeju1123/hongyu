import React, {PropsWithChildren} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import styles from '../styles/HeaderStyle';
import images from '../styles/images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigation';

type HeaderProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MainPage',
    undefined
  >;
}>;

function Header({navigation}: HeaderProps): JSX.Element {
  const {navigate} = navigation;
  const {mainLantern, pencilWithZh} = images.module;

  return (
    <View style={styles.headerBox}>
      <TouchableOpacity>
        <Image style={styles.logoImg} source={mainLantern} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate('SearchPage')}
        style={styles.inputSection}>
        <Text style={styles.text}>단어를 검색해보세요!</Text>
        <Image style={styles.pencilWithZhImg} source={pencilWithZh} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
