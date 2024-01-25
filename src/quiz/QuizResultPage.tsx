import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuizStackParamList} from '../navigation/QuizNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HeaderBackButton} from '@react-navigation/elements';
import {
  BackHandler,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgIcon from '../module/SvgIcon';
import QuizResultCard from '../module/QuizResultCard';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {lightTheme} from '../styles/colors';
import styles from '../styles/quiz/QuizResultPageStyle';
import cardWrapperStyles from '../styles/module/CardWrapperStyle';

enum resultType {
  ALL = 'all',
  CORRECT = 'correct',
  WRONG = 'wrong',
}

type QuizResultPageProps = NativeStackScreenProps<
  QuizStackParamList,
  'QuizResultPage'
>;

function QuizResultPage({
  navigation: {setOptions, pop},
  route: {
    params: {words, corrected},
  },
}: QuizResultPageProps) {
  console.log('in result page');

  const {green, red, white} = lightTheme;
  const {ALL, CORRECT, WRONG} = resultType;
  const [nav, setnav] = useState<resultType>(ALL);
  const [filtered, setFiltered] = useState(words);

  const handleNav = (type: resultType) => {
    setnav(type);
    type === ALL && setFiltered(words);
    type === CORRECT &&
      setFiltered(words.filter(({_id}) => corrected.includes(_id)));
    type === WRONG &&
      setFiltered(words.filter(({_id}) => !corrected.includes(_id)));
  };

  useEffect(() => {
    const handleBackButton = (props: HeaderBackButtonProps) => (
      <HeaderBackButton
        {...props}
        onPress={() => {
          pop(2);
        }}
      />
    );

    const handleHardwareBack = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        pop(2);
        return true;
      },
    );
    setOptions({
      headerLeft: handleBackButton,
    });

    return () => handleHardwareBack.remove();
  }, [setOptions, pop]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={[styles.navTab, styles.dirRow]}>
        <TouchableOpacity
          onPress={() => handleNav(ALL)}
          style={[
            styles.dirRow,
            styles.navButton,
            nav === ALL && styles.bottomLine,
          ]}>
          <Text style={styles.text}>전체</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNav(CORRECT)}
          style={[
            styles.dirRow,
            styles.navButton,
            nav === CORRECT && styles.bottomLine,
          ]}>
          <SvgIcon name="Circle" size={13} fill={green} />
          <Text style={[styles.text, {color: green}]}>정답</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNav(WRONG)}
          style={[
            styles.dirRow,
            styles.navButton,
            nav === WRONG && styles.bottomLine,
          ]}>
          <SvgIcon name="Cross" size={13} fill={red} />
          <Text style={[styles.text, {color: red}]}>오답</Text>
        </TouchableOpacity>
      </View>
      <View style={[cardWrapperStyles.cardWrapper, {backgroundColor: white}]}>
        <FlatList
          contentContainerStyle={styles.flatlistContent}
          data={filtered}
          renderItem={({item}) => {
            const isCorrected = corrected.includes(item._id);
            return <QuizResultCard voca={item} isCorrected={isCorrected} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default QuizResultPage;
