import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {HskStackParamList} from '../navigation/HskNavigation';
import {useRealm} from '../context/RealmConfigContext';

import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../styles/EditWordPageStyle';
import NavBar from '../module/NavBar';
import {lightTheme} from '../styles/colors';
import {selectWord} from '../service/selectData';
import images from '../styles/images';

type EditWordPageProps = NativeStackScreenProps<
  HskStackParamList,
  'EditWordPage'
>;

function EditWordPage({navigation: {goBack}, route}: EditWordPageProps) {
  const {id} = route.params;
  const realm = useRealm();
  const {
    wordClass,
    module: {checked},
  } = images;
  const wordData = useMemo(() => selectWord(realm, id), [realm, id]);
  const {word, intonation, wordclass, meaning, explanation} = wordData;

  const [textVal, setTextVal] = useState({
    word,
    intonation: intonation.slice(1, -1),
    meaning,
    explanation,
  });

  const handleChangeVal = (name: string, value: string) => {
    setTextVal(prev => ({...prev, [name]: value}));
  };

  const completeButton = () => (
    <TouchableOpacity>
      <Image source={checked} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavBar goBack={goBack} title="단어 수정" theme={lightTheme.red} />
      <ScrollView style={styles.scrollView}>
        <TextInput
          style={styles.textInput}
          value={textVal.word}
          onChangeText={value => handleChangeVal('word', value)}
          placeholder="단어를 입력하세요"
        />
        <TextInput
          style={styles.textInput}
          value={textVal.intonation}
          onChangeText={value => handleChangeVal('intonation', value)}
          placeholder="발음을 입력하세요"
        />
        <TouchableOpacity activeOpacity={0.7} style={styles.rowWrapper}>
          {wordclass.split(', ').map((wc: string) => (
            <Image
              style={styles.wordclassImg}
              key={wc}
              source={wordClass[wc]}
            />
          ))}
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          value={textVal.meaning}
          onChangeText={value => handleChangeVal('meaning', value)}
          placeholder="뜻을 입력하세요"
        />
        <TextInput
          multiline
          style={styles.textInput}
          value={textVal.explanation}
          onChangeText={value => handleChangeVal('explanation', value)}
          placeholder="메모를 입력하세요"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditWordPage;
