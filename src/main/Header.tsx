import React, {useState} from 'react';
import {View, Image, TouchableOpacity, TextInput} from 'react-native';
import {lightTheme} from '../styles/colors';
import styles from '../styles/HeaderStyle';
import images from '../styles/images';

function Header(): JSX.Element {
  const [text, setText] = useState('');
  const {mainLantern, pencilWithZh} = images.module;

  return (
    <View style={styles.headerBox}>
      <TouchableOpacity>
        <Image style={styles.logoImg} source={mainLantern} />
      </TouchableOpacity>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="단어를 검색해보세요!"
          placeholderTextColor={lightTheme.ligthGray}
        />
        <TouchableOpacity style={styles.pencilWithZhImgWrapper}>
          <Image style={styles.pencilWithZhImg} source={pencilWithZh} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;
