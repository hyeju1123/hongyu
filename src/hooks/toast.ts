import {useSetRecoilState} from 'recoil';
import {toastState} from '../recoil/ToastState';

export type ToastDataProps = {
  text: string;
  icon: string;
  remove: boolean;
};

export default function Toast() {
  const handleToastData = useSetRecoilState(toastState);

  const removeToast = (timeout: number = 2000) => {
    setTimeout(() => {
      handleToastData(prev => ({...prev, status: false}));
    }, timeout);
  };

  const fireToast = ({text, icon, remove}: ToastDataProps) => {
    handleToastData({
      text,
      status: true,
      icon,
    });
    remove && removeToast();
  };

  return {removeToast, fireToast};
}
