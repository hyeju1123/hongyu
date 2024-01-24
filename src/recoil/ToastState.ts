import {atom} from 'recoil';

export enum ToastIcon {
  Normal = 'normal',
  AbNormal = 'abnormal',
}

export const toastState = atom({
  key: 'toast',
  default: {status: false, text: '', icon: ToastIcon.Normal},
});
