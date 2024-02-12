import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from '../styles/module/PickQuizTypeModalStyle';
import SvgIcon from './SvgIcon';
import {lightTheme} from '../styles/colors';
import useQuiz from '../hooks/quiz';
import CategoryCard from './CategoryCard';
import {QuizPageStackParamList} from '../navigation/QuizNavigation';

type CardsProps = {
  handleMove: (quizType: keyof QuizPageStackParamList) => void;
};

type PickQuizTypeModalProps = {
  handleModal: () => void;
} & CardsProps;

const Cards = ({handleMove}: CardsProps): JSX.Element => {
  const {getQuizTypeData} = useQuiz();
  return (
    <>
      {getQuizTypeData().map(({title, desc, icon, navData}) => (
        <TouchableOpacity
          onPress={() => handleMove(navData)}
          activeOpacity={0.5}
          style={styles.buttonWrapper}
          key={title}>
          <CategoryCard title={title} desc={desc} icon={icon} />
        </TouchableOpacity>
      ))}
    </>
  );
};

function PickQuizTypeModal({
  handleModal,
  handleMove,
}: PickQuizTypeModalProps): JSX.Element {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.modal}>
      <TouchableOpacity onPress={handleModal} style={styles.closeButton}>
        <SvgIcon name="Cross" fill={lightTheme.black} size={20} />
      </TouchableOpacity>
      <Text style={styles.guideText}>시험 유형을 선택해주세요</Text>
      <Cards handleMove={handleMove} />
    </TouchableOpacity>
  );
}

export default PickQuizTypeModal;
