import React from 'react';
import {TouchableOpacity} from 'react-native';
import SvgIcon from '../module/SvgIcon';
import * as Icons from '../styles/svgIndex';
import {ResultDataProps} from './QuizResultPage';
import {useTheme} from '@react-navigation/native';
import styles from '../styles/quiz/WritingQuizPageStyle';

type CheckAnswerButtonType = {
  index: number;
  oButton: boolean;
  quizResult: ResultDataProps[];
  handleCheckAnswer: () => void;
};

const CheckAnswerButton = ({
  index,
  oButton,
  quizResult,
  handleCheckAnswer,
}: CheckAnswerButtonType): JSX.Element => {
  const {
    colors: {healthy, warning, deepShadow},
  } = useTheme();

  const icon = (oButton ? 'Circle' : 'Cross') as keyof typeof Icons;
  const iconColor = oButton ? healthy : warning;
  const currentState = quizResult[index];
  const correctCheck = oButton && currentState.correct ? 'Checkbox' : 'Square';
  const wrongCheck = !oButton && currentState.correct ? 'Square' : 'Checkbox';
  const checkbox = (oButton ? correctCheck : wrongCheck) as keyof typeof Icons;

  return (
    <TouchableOpacity
      style={styles.serviceButtonWrapper}
      onPress={handleCheckAnswer}>
      <SvgIcon name={icon} fill={iconColor} size={styles.ox.width} />
      <SvgIcon name={checkbox} fill={deepShadow} size={styles.checkBox.width} />
    </TouchableOpacity>
  );
};

export default CheckAnswerButton;
