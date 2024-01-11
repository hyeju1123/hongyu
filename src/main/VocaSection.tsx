import React, {PropsWithChildren} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Card, {ThemeColor} from '../module/Card';
import styles from '../styles/VocaSectionStyle';
import {RootStackParamList} from '../navigation/RootNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import images from '../styles/images';

type VocaSectionProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MainPage',
    undefined
  >;
}>;

function VocaSection({navigation: {navigate}}: VocaSectionProps) {
  const {lanternOn} = images.module;
  const levels = [1, 2, 3, 4, 5, 6];

  return (
    <View>
      <Text style={styles.sectionText}>HSK 단어</Text>
      <View style={styles.cardsWrapper}>
        {levels.map(level => (
          <TouchableOpacity
            onPress={() => navigate('HskNavigation', {level})}
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
      <TouchableOpacity onPress={() => navigate('BookmarkNavigation')}>
        <Card theme={ThemeColor.Red}>
          <View style={styles.scrap}>
            <Text style={styles.scrapText}>내 단어장</Text>
            <Image style={styles.scrapImg} source={lanternOn} />
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
}

export default VocaSection;
