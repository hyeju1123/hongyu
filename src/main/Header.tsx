import React, {PropsWithChildren} from 'react';
import {RootStackParamList} from '../navigation/RootNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {View, TouchableOpacity, Text} from 'react-native';
import SvgIcon from '../module/SvgIcon';

import {useSetRecoilState} from 'recoil';
import {themeState} from '../recoil/ThemeState';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles/main/HeaderStyle';
import {useTheme} from '@react-navigation/native';

type HeaderProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MainPage',
    undefined
  >;
}>;

function Header({navigation: {navigate}}: HeaderProps): JSX.Element {
  const {
    dark,
    colors: {ongoingState, iconPrimary},
  } = useTheme();
  const setTheme = useSetRecoilState(themeState);

  const handleTheme = async () => {
    const newTheme = dark ? 'light' : 'dark';
    await AsyncStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <View style={styles.headerBox}>
      <TouchableOpacity onPress={handleTheme}>
        <SvgIcon name="Hong" size={styles.hongIcon.width} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate('SearchNavigation')}
        style={[styles.inputSection, {borderColor: iconPrimary}]}>
        <Text style={[styles.text, {color: ongoingState}]}>
          단어를 검색해보세요!
        </Text>
        <SvgIcon
          name="Search"
          fill={iconPrimary}
          size={styles.searchIcon.width}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
