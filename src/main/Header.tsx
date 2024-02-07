import React, {PropsWithChildren} from 'react';
import {RootStackParamList} from '../navigation/RootNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {View, TouchableOpacity, Text} from 'react-native';
import SvgIcon from '../module/SvgIcon';

import {lightTheme} from '../styles/colors';
import styles from '../styles/main/HeaderStyle';

type HeaderProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MainPage',
    undefined
  >;
}>;

function Header({navigation: {navigate}}: HeaderProps): JSX.Element {
  return (
    <View style={styles.headerBox}>
      <TouchableOpacity>
        <SvgIcon name="Hong" size={65} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate('SearchNavigation')}
        style={styles.inputSection}>
        <Text style={styles.text}>단어를 검색해보세요!</Text>
        <SvgIcon name="Search" size={15} fill={lightTheme.red} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
