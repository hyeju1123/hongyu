import {useCallback} from 'react';
import {useSetRecoilState} from 'recoil';
import {toastState} from '../recoil/ToastState';

export type ToastDataProps = {
  text: string;
  icon: string;
  remove: boolean;
};

export default function Toast() {
  const handleToastData = useSetRecoilState(toastState);

  const removeToast = useCallback(
    (timeout: number = 3000) => {
      setTimeout(() => {
        handleToastData(prev => ({...prev, status: false}));
      }, timeout);
    },
    [handleToastData],
  );

  const fireToast = useCallback(
    ({text, icon, remove}: ToastDataProps) => {
      handleToastData({
        text,
        status: true,
        icon,
      });
      remove && removeToast();
    },
    [handleToastData, removeToast],
  );

  return {removeToast, fireToast};
}
