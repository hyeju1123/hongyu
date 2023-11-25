import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {HskStackParamList} from '../navigation/HskNavigation';
import {useRealm} from '../context/RealmConfigContext';
import useToast from '../hooks/toast';
import NavBar from '../module/NavBar';
import CompleteButton from '../module/CompleteButton';
import {selectWord} from '../service/selectData';
import {getWCLabels, limitTextLength} from '../service/util';
import {VocaContentType, updateVcoa} from '../service/updateData';
import styles from '../styles/EditWordPageStyle';
import {lightTheme} from '../styles/colors';
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
    deleteWordClass,
    module: {closed},
  } = images;
  const wordData = useMemo(() => selectWord(realm, id), [realm, id]);
  const {word, intonation, wordclass, meaning, explanation} = wordData;
  const {fireToast} = useToast();

  const [textVal, setTextVal] = useState({
    word,
    intonation: intonation.slice(1, -1),
    meaning,
    explanation,
  });
  const [currentWC, setCurrentWC] = useState(wordclass.split(', '));
  const [showWCTemplate, setShowWCTemplate] = useState(false);

  const handleChangeVal = (name: string, value: string) => {
    !limitTextLength(value, fireToast) &&
      setTextVal(prev => ({...prev, [name]: value}));
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
    <SafeAreaView style={styles.container}>
      <NavBar
        goBack={goBack}
        title="단어 수정"
        theme={lightTheme.red}
        rightButton={<CompleteButton updateFn={doUpdateWord} />}
      />
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
