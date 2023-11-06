import React, {useState} from 'react';
import {View, Image, TouchableOpacity, TextInput} from 'react-native';
import {lightTheme} from '../styles/colors';
import styles from '../styles/HeaderStyles';

function Header() {
  const [text, setText] = useState('');
  return (
    <View style={styles.headerBox}>
      <TouchableOpacity activeOpacity={0.7}>
        <Image
          style={styles.logoImg}
          source={require('../../images/mainLantern.png')}
        />
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
          <Image
            style={styles.pencilWithZhImg}
            source={require('../../images/pencilWithZh.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;
