import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BusuStackParamList} from '../navigation/BusuNavigation';
import Card from '../module/Card';
import DebouncedTextInput from '../module/DebouncedTextInput';
import useUtil from '../hooks/util';
import {useVoca} from '../providers/VocaProvider';

import images from '../styles/images';
import styles from '../styles/BusuDetailPageStyle';

type BusuDetailPageProps = NativeStackScreenProps<
  BusuStackParamList,
  'BusuDetailPage'
>;

function BusuDetailPage({route}: BusuDetailPageProps): JSX.Element {
  const {
    busuData: {_id, busu, xunyin, yin, info, explanation, sample, bookmarked},
  } = route.params;
  const {lanternOn, lanternOffWhite} = images.module;
  const {handleBookmark} = useUtil();
  const {updateBusuExplanation} = useVoca();
  const [bookmark, setBookmark] = useState(bookmarked);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}>
        <Card
          shadow
          underdressing={false}
          marginVertical={8}
          paddingVertical={15}
          paddingHorizontal={15}>
          <Text style={busu.length > 3 ? styles.longWord : styles.word}>
            {busu}
          </Text>
          <Text style={styles.xunyin}>{xunyin}</Text>
          <Text style={styles.intonation}>[{yin}]</Text>
        </Card>
        <Card
          shadow
          underdressing={false}
          marginVertical={8}
          paddingVertical={15}
          paddingHorizontal={15}>
          <Text style={styles.infoTitleText}># 부수 정보</Text>
          <Text style={styles.meaning}>{info}</Text>
        </Card>
        <Card
          shadow
          underdressing={false}
          marginVertical={8}
          paddingVertical={15}
          paddingHorizontal={15}>
          <Text style={styles.infoTitleText}># 예시</Text>
          <Text style={styles.meaning}>{sample}</Text>
        </Card>
        <Card shadow underdressing={false} marginVertical={8}>
          <DebouncedTextInput
            style={styles.meaning}
            textVal={explanation || ''}
            placeholder="# 메모를 남겨보세요."
            updateFn={val => updateBusuExplanation(_id, val)}
          />
        </Card>
        <TouchableOpacity
          onPress={() =>
            handleBookmark({setBookmark, _id, word: busu, bookmark, busu: true})
          }
          style={styles.bookmarkBtn}>
          <Image
            style={styles.bookmarkImg}
            source={bookmark ? lanternOn : lanternOffWhite}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BusuDetailPage;
