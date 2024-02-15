import React, {useEffect, useRef} from 'react';
import {HeaderBackButton} from '@react-navigation/elements';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {QuizStackParamList} from '../navigation/QuizNavigation';

import useToast from '../hooks/toast';
import {ToastIcon} from '../recoil/ToastState';
import {BackHandler} from 'react-native';

type BackButtonProps = {
  navigation: NativeStackNavigationProp<
    QuizStackParamList,
    keyof QuizStackParamList
  >;
};

function BackButton({navigation: {setOptions, goBack}}: BackButtonProps) {
  const backEvent = useRef(0);
  const {fireToast} = useToast();

  useEffect(() => {
    const backAction = () => {
      setTimeout(() => {
        backEvent.current = 0;
      }, 2000);
      if (backEvent.current === 0) {
        backEvent.current += 1;
        fireToast({
          text: "'뒤로가기'를 한 번 더 누르면 시험이 종료됩니다",
          icon: ToastIcon.AbNormal,
          remove: true,
        });
      } else {
        goBack();
      }
      return true;
    };

    const handleBackButton = (props: HeaderBackButtonProps) => (
      <HeaderBackButton {...props} onPress={backAction} />
    );

    const handleHardwareBack = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    setOptions({
      headerLeft: handleBackButton,
    });

    return () => {
      handleHardwareBack.remove();
    };
  }, [fireToast, setOptions, goBack]);

  return <></>;
}

export default BackButton;
