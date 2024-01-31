import React from 'react';
import {RealmProvider} from './RealmConfigContext';
import {RecoilRoot} from 'recoil';
import {VocaProvider} from './src/providers/VocaProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigation from './src/navigation/RootNavigation';
import Toast from './src/module/Toast';

import styles from './src/styles/main/MainPageStyle';

function App(): JSX.Element {
  return (
    <RealmProvider>
      <RecoilRoot>
        <VocaProvider>
          <GestureHandlerRootView style={styles.container}>
            <RootNavigation />
            <Toast />
          </GestureHandlerRootView>
        </VocaProvider>
      </RecoilRoot>
    </RealmProvider>
  );
}

export default App;
