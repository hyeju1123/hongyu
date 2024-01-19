import React, {PropsWithChildren} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Card, {ThemeColor} from '../module/Card';
import styles from '../styles/VocaSectionStyle';
import {RootStackParamList} from '../navigation/RootNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useSetRecoilState} from 'recoil';
import {WordNav, wordNavState} from '../recoil/WordNavState';
import SvgIcon from '../module/SvgIcon';

type VocaSectionProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MainPage',
    undefined
  >;
}>;

const LEVELS = [1, 2, 3, 4, 5, 6];

function VocaSection({navigation: {navigate}}: VocaSectionProps) {
  const navTypeSetter = useSetRecoilState(wordNavState);

  return (
    <View>
      <Text style={styles.sectionText}>HSK 단어</Text>
      <View style={styles.cardsWrapper}>
        {LEVELS.map(level => (
          <TouchableOpacity
            onPress={() => {
              navTypeSetter(() => ({navType: WordNav.Voca, level}));
              navigate('WordNavigation');
            }}
            key={level}>
            <Card theme={ThemeColor.Red}>
              <View style={styles.contents}>
                <View style={styles.whiteDot} />
                <Text style={[styles.levelText]}>{`${level} 급`}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => {
          navTypeSetter(prev => ({...prev, navType: WordNav.Book}));
          navigate('WordNavigation');
        }}>
        <Card theme={ThemeColor.Red}>
          <View style={styles.scrap}>
            <Text style={styles.scrapText}>내 단어장</Text>
            <SvgIcon name="LanternOn" size={25} />
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
}

export default VocaSection;
