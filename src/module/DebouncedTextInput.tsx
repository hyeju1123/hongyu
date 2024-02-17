import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TextStyle} from 'react-native';

import useUtil from '../hooks/util';
import useToast from '../hooks/toast';
import useDebounce from '../hooks/debounce';
import useDidMountEffect from '../hooks/didMount';
import {useIsFocused} from '@react-navigation/native';

import {fonts} from '../styles/fonts';
import {lightTheme} from '../styles/colors';
import {ToastIcon} from '../recoil/ToastState';
import {DisplaySize, getDisplaySize} from '../styles/screen';

type Props = {
  style: any;
  textVal: string;
  placeholder: string;
  forSearch?: boolean;
  updateFn: (val: string) => void;
};

function DebouncedTextInput({
  style,
  textVal,
  placeholder,
  forSearch = false,
  updateFn,
}: Props): JSX.Element {
  const {fireToast} = useToast();
  const isFocused = useIsFocused();
  const {limitTextLength} = useUtil();
  const [text, setText] = useState(textVal);
  const debounced = useDebounce<string>(text, 500);

  useDidMountEffect(() => {
    if (isFocused && !forSearch) {
      setText(textVal);
    }
  }, [isFocused, textVal]);

  useDidMountEffect(() => {
    if (!limitTextLength(debounced)) {
      updateFn(debounced);
      !forSearch &&
        fireToast({
          text: '메모가 저장되었습니다.',
          icon: ToastIcon.Normal,
          remove: true,
        });
    }
  }, [debounced]);

  return (
    <>
      <TextInput
        multiline={forSearch ? false : true}
        style={style}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        autoFocus={forSearch ? true : false}
        placeholderTextColor={lightTheme.gray}
      />
      {!forSearch && <Text style={styles.limitText}>{text.length} / 250</Text>}
    </>
  );
}

const handleStyle = () => {
  const commonPart: {limitText: TextStyle} = {
    limitText: {
      alignSelf: 'flex-end',
      fontFamily: fonts.pinyin,
      fontSize: 12,
      color: lightTheme.black,
    },
  };
  if (getDisplaySize() === DisplaySize.Large) {
    return StyleSheet.create({
      limitText: {
        ...commonPart.limitText,
        fontSize: 16,
      },
    });
  }
  if (getDisplaySize() === DisplaySize.Small) {
    return StyleSheet.create({
      limitText: {
        ...commonPart.limitText,
        fontSize: 10,
      },
    });
  }
  return StyleSheet.create(commonPart);
};

const styles = handleStyle();

export default DebouncedTextInput;
