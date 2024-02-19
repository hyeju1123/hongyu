import React from 'react';
import {TouchableOpacity} from 'react-native';
import SvgIcon from '../module/SvgIcon';
import {lightTheme} from '../styles/colors';
import * as Icons from '../styles/svgIndex';
import styles from '../styles/quiz/WritingQuizPageStyle';
import {ResultDataProps} from './QuizResultPage';
import iconSize from '../styles/iconSize';

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
  const {checkBox, ox} = iconSize;
  const {healthy, warning, deepShadow} = lightTheme;
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
      <SvgIcon name={icon} fill={iconColor} size={ox} />
      <SvgIcon name={checkbox} fill={deepShadow} size={checkBox} />
    </TouchableOpacity>
  );
};

export default CheckAnswerButton;
