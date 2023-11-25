import {ToastDataProps} from '../hooks/toast';

export const getWCLabels = () => {
  return [
    '형용사',
    '부사',
    '조동사',
    '접속사',
    '감탄사',
    '성어',
    '명사',
    '수사',
    '기타',
    '조사',
    '개사',
    '대명사',
    '양사',
    '동사',
  ];
};

export const limitTextLength = (
  value: string,
  fireToast: ({text, icon, remove}: ToastDataProps) => void,
) => {
  if (value.length > 250) {
    fireToast({
      text: '250자를 초과하지 말아주세요',
      icon: 'warning',
      remove: true,
    });
    return true;
  }
  return false;
};
