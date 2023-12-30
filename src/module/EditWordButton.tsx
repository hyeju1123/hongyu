import React, {PropsWithChildren} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styles from '../styles/WordDetailPageStyle';
import images from '../styles/images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HskStackParamList} from '../navigation/HskNavigation';
import {BookmarkStackParamList} from '../navigation/BookmarkNavigation';
import {RootStackParamList} from '../navigation/RootNavigation';

type EditWordButtonProps = PropsWithChildren<{
  navigation: NativeStackNavigationProp<
    RootStackParamList | HskStackParamList | BookmarkStackParamList,
    'WordDetailPage'
  >;
  id: number;
}>;

function EditWordButton({navigation: {navigate}, id}: EditWordButtonProps) {
  const {
    module: {editWhite},
  } = images;

  return (
    <TouchableOpacity onPress={() => navigate('EditWordPage', {id})}>
      <Image style={styles.editImg} source={editWhite} />
    </TouchableOpacity>
  );
}

export default EditWordButton;
