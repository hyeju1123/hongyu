import React, {PropsWithChildren} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/StackParamListType';
import Pencil from '../../svg/module/pencil.svg';
import {useTheme} from '@react-navigation/native';

type EditWordButtonProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<RootStackParamList, 'VocaDetailPage'>;
  id: number;
}>;

function EditWordButton({navigation: {navigate}, id}: EditWordButtonProps) {
  const {
    colors: {textPrimary},
  } = useTheme();
  return (
    <TouchableOpacity
      style={styles.buttonWrapper}
      onPress={() => navigate('EditVocaPage', {id})}>
      <Pencil fill={textPrimary} stroke={textPrimary} width={18} height={18} />
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
