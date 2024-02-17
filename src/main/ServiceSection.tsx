import React, {PropsWithChildren} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigation';
import {useSetRecoilState} from 'recoil';
import {WordNav, wordNavState} from '../recoil/WordNavState';

import {View, Text} from 'react-native';
import FlatCard from '../module/FlatCard';
import Vocatest from '../../svg/main/vocatest.svg';
import RadicalDict from '../../svg/main/radicalDict.svg';
import styles from '../styles/main/VocaSectionStyle';

type ServiceSectionProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MainPage',
    undefined
  >;
}>;

function ServiceSection({navigation: {navigate}}: ServiceSectionProps) {
  const navTypeSetter = useSetRecoilState(wordNavState);

  return (
    <View>
      <Text style={styles.sectionText}>학습 도구</Text>
      <FlatCard
        navFn={() => {
          navigate('QuizNavigation');
        }}
        Icon={Vocatest}
        title="단어 암기 시험"
        desc="다양한 시험을 통해 암기 학습을 해보세요"
      />
      <FlatCard
        navFn={() => {
          navTypeSetter(prev => ({...prev, navType: WordNav.Busu}));
          navigate('WordNavigation');
        }}
        Icon={RadicalDict}
        title="부수 사전"
        desc="한자를 구성하는 부수의 뜻을 살펴보세요"
      />
    </View>
  );
}

export default ServiceSection;
