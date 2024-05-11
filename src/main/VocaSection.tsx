import React, {PropsWithChildren, useCallback, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {RootStackParamList} from '../navigation/StackParamListType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSetRecoilState} from 'recoil';
import {WordNav, wordNavState} from '../recoil/WordNavState';

import SvgIcon from '../module/SvgIcon';
import Card from '../module/Card';
import {useTheme} from '@react-navigation/native';
import styles from '../styles/main/VocaSectionStyle';

type VocaSectionProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MainPage',
    undefined
  >;
}>;

const LEVELS = [1, 2, 3, 4, 5, 6];

function VocaSection({navigation: {navigate}}: VocaSectionProps) {
  const {colors} = useTheme();
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
            navigate('CategoryBranchPage');
          }}
          key={item}>
          <Card
            color={colors.primary}
            underColor={colors.secondary}
            marginVertical={3}>
            <View style={styles.contents}>
              <View
                style={[styles.dot, {backgroundColor: colors.textSecondary}]}
              />
              <Text
                style={[
                  styles.levelText,
                  {color: colors.textSecondary},
                ]}>{`${item} 급`}</Text>
            </View>
          </Card>
        </TouchableOpacity>
      );
    },
    [navTypeSetter, navigate, layoutWidth, numCols, colors],
  );

  return (
    <>
      <Text style={[styles.sectionText, {color: colors.textPrimary}]}>
        HSK 단어
      </Text>
      <View style={styles.contents}>
        <FlatList
          data={LEVELS}
          key={layoutWidth}
          numColumns={numCols}
          scrollEnabled={false}
          renderItem={renderItem}
          style={styles.contents}
          columnWrapperStyle={[styles.columnWrapperStyle, {width: layoutWidth}]}
          onLayout={e => setLayoutWidth(e.nativeEvent.layout.width)}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navTypeSetter(prev => ({...prev, navType: WordNav.Book}));
          navigate('CategoryBranchPage');
        }}>
        <Card color={colors.primary} underColor={colors.secondary}>
          <View style={styles.scrap}>
            <Text style={[styles.scrapText, {color: colors.textSecondary}]}>
              내 단어장
            </Text>
            <SvgIcon name="LanternOn" size={styles.lanternIcon.width} />
          </View>
        </Card>
      </TouchableOpacity>
    </>
  );
}

export default VocaSection;
