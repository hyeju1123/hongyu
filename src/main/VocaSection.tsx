import React, {PropsWithChildren, useCallback, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Card, {ThemeColor} from '../module/Card';
import styles from '../styles/main/VocaSectionStyle';
import {RootStackParamList} from '../navigation/RootNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useSetRecoilState} from 'recoil';
import {WordNav, wordNavState} from '../recoil/WordNavState';
import SvgIcon from '../module/SvgIcon';
import iconSize from '../styles/iconSize';

type VocaSectionProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MainPage',
    undefined
  >;
}>;

const LEVELS = [1, 2, 3, 4, 5, 6];
const {vocaSectionLantern} = iconSize;

function VocaSection({navigation: {navigate}}: VocaSectionProps) {
  const navTypeSetter = useSetRecoilState(wordNavState);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const numCols = useMemo(() => (layoutWidth >= 480 ? 3 : 2), [layoutWidth]);

  const renderItem = useCallback(
    ({item}: {item: number}) => {
      return (
        <TouchableOpacity
          style={{width: layoutWidth / numCols - 3}}
          onPress={() => {
            navTypeSetter(() => ({navType: WordNav.Voca, level: item}));
            navigate('WordNavigation');
          }}
          key={item}>
          <Card theme={ThemeColor.Red} marginVertical={3}>
            <View style={styles.contents}>
              <View style={styles.whiteDot} />
              <Text style={[styles.levelText]}>{`${item} 급`}</Text>
            </View>
          </Card>
        </TouchableOpacity>
      );
    },
    [navTypeSetter, navigate, layoutWidth, numCols],
  );

  return (
    <>
      <Text style={styles.sectionText}>HSK 단어</Text>
      <View style={styles.cardsWrapper}>
        <FlatList
          data={LEVELS}
          key={layoutWidth}
          numColumns={numCols}
          scrollEnabled={false}
          renderItem={renderItem}
          style={styles.flatlist}
          columnWrapperStyle={[styles.columnWrapperStyle, {width: layoutWidth}]}
          onLayout={e => setLayoutWidth(e.nativeEvent.layout.width)}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navTypeSetter(prev => ({...prev, navType: WordNav.Book}));
          navigate('WordNavigation');
        }}>
        <Card theme={ThemeColor.Red}>
          <View style={styles.scrap}>
            <Text style={styles.scrapText}>내 단어장</Text>
            <SvgIcon name="LanternOn" size={vocaSectionLantern} />
          </View>
        </Card>
      </TouchableOpacity>
    </>
  );
}

export default VocaSection;
