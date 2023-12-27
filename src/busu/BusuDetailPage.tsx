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
import NavBar from '../module/NavBar';
import InfoCard from '../module/InfoCard';
import useUtil from '../hooks/util';
import {useVoca} from '../providers/VocaProvider';

import images from '../styles/images';
import {lightTheme} from '../styles/colors';
import styles from '../styles/BusuDetailPageStyle';
import DebouncedTextInput from '../module/DebouncedTextInput';

type BusuDetailPageProps = NativeStackScreenProps<
  BusuStackParamList,
  'BusuDetailPage'
>;

function BusuDetailPage({navigation, route}: BusuDetailPageProps): JSX.Element {
  const {goBack} = navigation;
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
      <NavBar goBack={goBack} title={'상세보기'} theme={lightTheme.darkRed} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}>
        <InfoCard>
          <Text style={busu.length > 4 ? styles.longWord : styles.word}>
            {busu}
          </Text>
          <Text style={styles.xunyin}>{xunyin}</Text>
          <Text style={styles.intonation}>[{yin}]</Text>
        </InfoCard>
        <InfoCard>
          <Text style={styles.infoTitleText}># 부수 정보</Text>
          <Text style={styles.infoText}>{info}</Text>
        </InfoCard>
        <InfoCard>
          <Text style={styles.infoTitleText}># 예시</Text>
          <Text style={styles.infoText}>{sample}</Text>
        </InfoCard>
        <InfoCard>
          <DebouncedTextInput
            style={styles.infoText}
            textVal={explanation || ''}
            placeholder="# 메모를 남겨보세요."
            updateFn={val => updateBusuExplanation(_id, val)}
          />
        </InfoCard>
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
