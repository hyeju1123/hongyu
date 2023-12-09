import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavBar from '../module/NavBar';
import {lightTheme} from '../styles/colors';
import styles from '../styles/BusuDetailPageStyle';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BusuStackParamList} from '../navigation/BusuNavigation';
import InfoCard from '../module/InfoCard';
import images from '../styles/images';
import {updateBusuBookmark} from '../service/updateData';
import {useRealm} from '../context/RealmConfigContext';
import useToast from '../hooks/toast';

type BusuDetailPageProps = NativeStackScreenProps<
  BusuStackParamList,
  'BusuDetailPage'
>;

function BusuDetailPage({navigation, route}: BusuDetailPageProps): JSX.Element {
  const {goBack} = navigation;
  const realm = useRealm();
  const {
    busuData: {_id, busu, xunyin, yin, explanation, sample, bookmarked},
  } = route.params;
  const {lanternOn, lanternOffWhite} = images.module;
  const [bookmark, setBookmark] = useState(bookmarked);
  const {fireToast} = useToast();

  const handleBusuBookmark = () => {
    setBookmark(!bookmark);
    updateBusuBookmark(realm, _id, !bookmark);
    const status = bookmark ? '삭제' : '저장';
    fireToast({
      text: `'내 단어장'에 ${status}되었습니다.`,
      icon: 'checkedGreen',
      remove: true,
    });
  };

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
          <Text style={styles.word}>{busu}</Text>
          <Text style={styles.xunyin}>{xunyin}</Text>
          <Text style={styles.intonation}>[{yin}]</Text>
        </InfoCard>
        <InfoCard>
          <Text style={styles.infoTitleText}># 부수 정보</Text>
          <Text style={styles.infoText}>{explanation}</Text>
        </InfoCard>
        <InfoCard>
          <Text style={styles.infoTitleText}># 예시</Text>
          <Text style={styles.infoText}>{sample}</Text>
        </InfoCard>
        <InfoCard>
          <TextInput
            multiline
            style={styles.infoText}
            placeholder="# 메모를 남겨보세요."
            placeholderTextColor={lightTheme.gray}
          />
        </InfoCard>
        <TouchableOpacity
          onPress={handleBusuBookmark}
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
