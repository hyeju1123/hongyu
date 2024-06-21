import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {useTheme} from '@react-navigation/native';
import styles from '../styles/module/ProgressButtonStyles';
import {useRecoilCallback} from 'recoil';
import {Word, vocaState} from '../recoil/WordListState';
import {useVoca} from '../providers/VocaProvider';

export const progressStatus = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
} as const;

export type ProgressStatusType =
  (typeof progressStatus)[keyof typeof progressStatus];

type ProgressButtonProps = {
  wordItem: Word;
  progress: number;
  dot?: boolean;
};

export default function ProgressButton({
  wordItem,
  progress,
  dot = false,
}: ProgressButtonProps): JSX.Element {
  const {_id} = wordItem;
  const {
    colors: {ongoingState, healthy, warning, textPrimary},
  } = useTheme();

  const {updateProgress} = useVoca();
  const {NOT_STARTED, IN_PROGRESS, COMPLETED} = progressStatus;

  const getProgressColor = (status: number) => {
    switch (status) {
      case NOT_STARTED:
        return {backgroundColor: ongoingState};
      case IN_PROGRESS:
        return {backgroundColor: warning};
      default:
        return {backgroundColor: healthy};
    }
  };

  const handleProgress = useRecoilCallback(
    ({set}) =>
      (currentProgress: number) => {
        const updatedProgress =
          currentProgress === COMPLETED ? NOT_STARTED : currentProgress + 1;
        updateProgress(_id, updatedProgress);
        set(vocaState(_id), {...wordItem, progress: updatedProgress});
      },
    [wordItem],
  );

  return (
    <TouchableOpacity
      onPress={dot ? undefined : () => handleProgress(progress)}
      style={[getProgressColor(progress), dot ? styles.dot : styles.button]}>
      {!dot && (
        <Text style={[styles.text, {color: textPrimary}]}>
          {progress * 50}%
        </Text>
      )}
    </TouchableOpacity>
  );
}
