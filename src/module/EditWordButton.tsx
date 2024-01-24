import React, {PropsWithChildren} from 'react';
import {TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WordStackParamList} from '../navigation/WordNavigation';
import {SearchStackParamList} from '../navigation/SearchNavigation';
import SvgIcon from './SvgIcon';
import {lightTheme} from '../styles/colors';

type EditWordButtonProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    WordStackParamList | SearchStackParamList,
    'VocaDetailPage'
  >;
  id: number;
}>;

function EditWordButton({navigation: {navigate}, id}: EditWordButtonProps) {
  return (
    <TouchableOpacity onPress={() => navigate('EditVocaPage', {id})}>
      <SvgIcon name="Pencil" size={20} color={lightTheme.gray} />
    </TouchableOpacity>
  );
}

export default EditWordButton;
