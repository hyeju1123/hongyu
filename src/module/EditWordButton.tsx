import React, {PropsWithChildren} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WordStackParamList} from '../navigation/WordNavigation';
import {SearchStackParamList} from '../navigation/SearchNavigation';
import Pencil from '../../svg/module/pencil.svg';
import {lightTheme} from '../styles/colors';

type EditWordButtonProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    WordStackParamList | SearchStackParamList,
    'VocaDetailPage'
  >;
  id: number;
}>;

function EditWordButton({navigation: {navigate}, id}: EditWordButtonProps) {
  const {black} = lightTheme;
  return (
    <TouchableOpacity
      style={styles.buttonWrapper}
      onPress={() => navigate('EditVocaPage', {id})}>
      <Pencil fill={black} stroke={black} width={18} height={18} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});

export default EditWordButton;
