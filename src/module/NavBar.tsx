import React, {PropsWithChildren, ReactElement} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {lightTheme} from '../styles/colors';
import {fonts} from '../styles/fonts';
import images from '../styles/images';

type NavBarProps = PropsWithChildren<{
  goBack: () => void;
  title: string;
  theme: string;
  rightButton?: ReactElement;
}>;

function NavBar({goBack, title, theme, rightButton}: NavBarProps): JSX.Element {
  const {arrow} = images.module;

  return (
    <View style={[styles.container, {backgroundColor: theme}]}>
      <TouchableOpacity onPress={() => goBack()}>
        <Image style={styles.arrow} source={arrow} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {rightButton}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    fontFamily: fonts.mainBold,
    fontSize: 18,
    color: lightTheme.white,
  },
  arrow: {
    width: 20,
    height: 10,
  },
});
export default NavBar;
