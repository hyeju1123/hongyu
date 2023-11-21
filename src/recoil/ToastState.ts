import {atom} from 'recoil';

export const toastState = atom({
  key: 'toast',
  default: {status: true, text: ''},
});
