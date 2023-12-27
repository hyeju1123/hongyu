import React from 'react';
import {RealmProvider} from './RealmConfigContext';
import {RecoilRoot} from 'recoil';
import Toast from './src/module/Toast';
import RootNavigation from './src/navigation/RootNavigation';
import {VocaProvider} from './src/providers/VocaProvider';

function App(): JSX.Element {
  return (
    <RealmProvider>
      <RecoilRoot>
        <VocaProvider>
          <RootNavigation />
          <Toast />
        </VocaProvider>
      </RecoilRoot>
    </RealmProvider>
  );
}

export default App;
