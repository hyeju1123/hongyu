import React, {PropsWithChildren} from 'react';
import {View, Text} from 'react-native';
import FlatCard from '../module/FlatCard';
import styles from '../styles/VocaSectionStyle';
import images from '../styles/images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigation';

type ServiceSectionProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MainPage',
    undefined
  >;
}>;

function ServiceSection({navigation}: ServiceSectionProps) {
  const {vocatest, radicalDict} = images.module;
  const {navigate} = navigation;

  return (
    <View>
      <Text style={styles.sectionText}>학습 도구</Text>
      <FlatCard
        navFn={() => {
          navigate('QuizNavigation');
        }}
        imgSrc={vocatest}
        title="단어 암기 시험"
        desc="다양한 시험을 통해 암기 학습을 해보세요."
      />
      <FlatCard
        navFn={() => {
          navigate('BusuNavigation');
        }}
        imgSrc={radicalDict}
        title="부수 사전"
        desc="한자를 구성하는 부수의 뜻을 살펴보세요."
      />
    </View>
  );
}

export default ServiceSection;
