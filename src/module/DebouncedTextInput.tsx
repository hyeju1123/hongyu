import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput} from 'react-native';

import useUtil from '../hooks/util';
import useToast from '../hooks/toast';
import useDebounce from '../hooks/debounce';
import useDidMountEffect from '../hooks/didMount';
import {useIsFocused} from '@react-navigation/native';

import {fonts} from '../styles/fonts';
import {lightTheme} from '../styles/colors';

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
    // prevent duplicate update after EditWordPage.
    if (text === textVal) {
      return;
    }

    if (!limitTextLength(debounced)) {
      updateFn(debounced);
      !forSearch &&
        fireToast({
          text: '메모가 저장되었습니다.',
          icon: 'checkedGreen',
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

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  limitText: {
    alignSelf: 'flex-end',
    fontFamily: fonts.main,
    fontSize: width * 0.03,
    marginTop: 5,
    marginBottom: -1 * width * 0.03,
  },
});

export default DebouncedTextInput;
