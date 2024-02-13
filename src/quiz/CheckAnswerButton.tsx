import React from 'react';
import {TouchableOpacity} from 'react-native';
import SvgIcon from '../module/SvgIcon';
import {lightTheme} from '../styles/colors';
import * as Icons from '../styles/svgIndex';
import styles from '../styles/quiz/WritingQuizPageStyle';
import {ResultDataProps} from './QuizResultPage';

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
  const {green, warning, gray} = lightTheme;
  const icon = (oButton ? 'Circle' : 'Cross') as keyof typeof Icons;
  const iconColor = oButton ? green : warning;
  const currentState = quizResult[index];
  const correctCheck = oButton && currentState.correct ? 'Checkbox' : 'Square';
  const wrongCheck = !oButton && currentState.correct ? 'Square' : 'Checkbox';
  const checkbox = (oButton ? correctCheck : wrongCheck) as keyof typeof Icons;

  return (
    <TouchableOpacity
      style={styles.serviceButtonWrapper}
      onPress={handleCheckAnswer}>
      <SvgIcon name={icon} fill={iconColor} size={10} />
      <SvgIcon name={checkbox} fill={gray} size={14} />
    </TouchableOpacity>
  );
};

export default CheckAnswerButton;
