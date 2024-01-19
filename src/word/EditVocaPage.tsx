import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';
import {WordStackParamList} from '../navigation/WordNavigation';
import {UpdateVocaContent, useVoca} from '../providers/VocaProvider';
import images from '../styles/images';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {vocaState} from '../recoil/WordListState';
import useToast from '../hooks/toast';
import useUtil from '../hooks/util';
import styles from '../styles/word/EditVocaPageStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {lightTheme} from '../styles/colors';
import SvgIcon from '../module/SvgIcon';

type EditVocaPageProps = NativeStackScreenProps<
  WordStackParamList,
  'EditVocaPage'
>;

type TextValProps = {
  word: string;
  intonation: string;
  meaning: string;
  explanation: string | undefined;
};

function EditVocaPage({
  navigation: {goBack},
  route: {
    params: {id},
  },
}: EditVocaPageProps) {
  const {updateVoca} = useVoca();
  const vocaItem = useRecoilValue(vocaState(id));
  const memoizedVocaItem = useMemo(() => vocaItem, [vocaItem]);
  const {word, intonation, wordclass, meaning, explanation} = memoizedVocaItem;

  const {fireToast} = useToast();
  const {getWCLabels, limitTextLength} = useUtil();
  const [textVal, setTextVal] = useState<TextValProps>({
    word,
    intonation: intonation.slice(1, -1),
    meaning,
    explanation,
  });
  const [currentWC, setCurrentWC] = useState(wordclass.split(', '));
  const [showWCTemplate, setShowWCTemplate] = useState(false);

  const {wordClass, deleteWordClass} = images;

  const handleChangeText = (name: string, value: string) => {
    !limitTextLength(value) && setTextVal(prev => ({...prev, [name]: value}));
  };

  const getFilteredWC = () => {
    const wcLabels = getWCLabels();
    return wcLabels.filter(label => !currentWC.includes(label));
  };

  const handleUpdateVoca = useRecoilCallback(
    ({set}) =>
      (finalTextVal: TextValProps, finalWC: string[]) => {
        const updatedVoca: UpdateVocaContent = {
          ...finalTextVal,
          intonation: '[' + finalTextVal.intonation + ']',
          wordclass: finalWC.join(', '),
        };
        updateVoca(id, updatedVoca);

        set(vocaState(id), {...vocaItem, ...updatedVoca});

        fireToast({
          text: '단어를 수정하였습니다!',
          icon: 'checkedGreen',
          remove: true,
        });
        goBack();
      },
    [vocaItem],
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <TextInput
          style={styles.textInput}
          value={textVal.word}
          onChangeText={value => handleChangeText('word', value)}
          placeholder="단어를 입력하세요"
          onFocus={() => setShowWCTemplate(false)}
        />
        <TextInput
          style={styles.textInput}
          value={textVal.intonation}
          onChangeText={value => handleChangeText('intonation', value)}
          placeholder="발음을 입력하세요"
          onFocus={() => setShowWCTemplate(false)}
        />
        <TouchableOpacity
          onPress={() => setShowWCTemplate(true)}
          style={styles.flexDirRow}>
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
          onChangeText={value => handleChangeText('meaning', value)}
          placeholder="뜻을 입력하세요"
          onFocus={() => setShowWCTemplate(false)}
        />
        <TextInput
          multiline
          style={styles.textInput}
          value={textVal.explanation}
          onChangeText={value => handleChangeText('explanation', value)}
          placeholder="메모를 입력하세요"
          placeholderTextColor={lightTheme.shadowGray}
          onFocus={() => setShowWCTemplate(false)}
        />
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={() => handleUpdateVoca(textVal, currentWC)}
            style={styles.completeButton}>
            <Text style={styles.completeText}>수정하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={showWCTemplate ? styles.wordclassBox : styles.wordclassBoxNone}>
        <TouchableOpacity
          onPress={() => setShowWCTemplate(false)}
          style={styles.closeButton}>
          <SvgIcon name="Cross" size={20} fill={lightTheme.white} />
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

export default EditVocaPage;
