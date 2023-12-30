import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {HskStackParamList} from '../navigation/HskNavigation';
import {useRealm} from '../../RealmConfigContext';
import useToast from '../hooks/toast';
import {selectWord} from '../service/selectData';
import useUtil from '../hooks/util';
import {VocaContentType, updateVcoa} from '../service/updateData';
import styles from '../styles/EditWordPageStyle';
import images from '../styles/images';

type EditWordPageProps = NativeStackScreenProps<
  HskStackParamList,
  'EditWordPage'
>;

function EditWordPage({navigation, route}: EditWordPageProps) {
  const {id} = route.params;
  const {goBack} = navigation;
  const realm = useRealm();
  const {
    wordClass,
    deleteWordClass,
    module: {closed},
  } = images;
  const wordData = useMemo(() => selectWord(realm, id), [realm, id]);
  const {word, intonation, wordclass, meaning, explanation} = wordData;
  const {fireToast} = useToast();
  const {getWCLabels, limitTextLength} = useUtil();
  const {checkedGreen} = images.module;

  const [textVal, setTextVal] = useState({
    word,
    intonation: intonation.slice(1, -1),
    meaning,
    explanation,
  });
  const [currentWC, setCurrentWC] = useState(wordclass.split(', '));
  const [showWCTemplate, setShowWCTemplate] = useState(false);

  const handleChangeVal = (name: string, value: string) => {
    !limitTextLength(value) && setTextVal(prev => ({...prev, [name]: value}));
  };

  const getFilteredWC = () => {
    const wcLabels = getWCLabels();
    return wcLabels.filter(label => !currentWC.includes(label));
  };

  const doUpdateWord = () => {
    const vocaData: VocaContentType = {
      ...textVal,
      intonation: '[' + textVal.intonation + ']',
      wordclass: currentWC.join(', '),
    };
    updateVcoa(realm, id, vocaData);

    fireToast({
      text: '단어를 수정하였습니다!',
      icon: 'checkedGreen',
      remove: true,
    });
    goBack();
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TextInput
          style={styles.textInput}
          value={textVal.word}
          onChangeText={value => handleChangeVal('word', value)}
          placeholder="단어를 입력하세요"
          onFocus={() => setShowWCTemplate(false)}
        />
        <TextInput
          style={styles.textInput}
          value={textVal.intonation}
          onChangeText={value => handleChangeVal('intonation', value)}
          placeholder="발음을 입력하세요"
          onFocus={() => setShowWCTemplate(false)}
        />
        <TouchableOpacity
          onPress={() => setShowWCTemplate(true)}
          style={styles.rowWrapper}>
          {currentWC.map((wc: string) => (
            <TouchableOpacity
              key={wc}
              onPress={() =>
                setCurrentWC(prev => prev.filter(label => label !== wc))
              }>
              <Image style={styles.wordclassImg} source={deleteWordClass[wc]} />
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
        <TextInput
          multiline
          style={styles.textInput}
          value={textVal.meaning}
          onChangeText={value => handleChangeVal('meaning', value)}
          placeholder="뜻을 입력하세요"
          onFocus={() => setShowWCTemplate(false)}
        />
        <TextInput
          multiline
          style={styles.textInput}
          value={textVal.explanation}
          onChangeText={value => handleChangeVal('explanation', value)}
          placeholder="메모를 입력하세요"
          onFocus={() => setShowWCTemplate(false)}
        />
        <TouchableOpacity onPress={doUpdateWord} style={styles.completeButton}>
          <Image source={checkedGreen} style={styles.completeImg} />
          <Text style={styles.completeText}>수정하기</Text>
        </TouchableOpacity>
      </ScrollView>
      <View
        style={showWCTemplate ? styles.wordclassBox : styles.wordclassBoxNone}>
        <TouchableOpacity
          onPress={() => setShowWCTemplate(false)}
          style={styles.closeButton}>
          <Image source={closed} style={styles.closeImage} />
        </TouchableOpacity>
        {getFilteredWC().map((wc: string) => (
          <TouchableOpacity
            onPress={() => setCurrentWC(prev => [...prev, wc])}
            key={wc}
            style={styles.wcButton}>
            <Image style={styles.wordclassImg} source={wordClass[wc]} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default EditWordPage;
