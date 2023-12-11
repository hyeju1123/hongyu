import React from 'react';
import {RealmProvider} from './RealmConfigContext';
import {RecoilRoot} from 'recoil';
import Toast from './src/module/Toast';
import RootNavigation from './src/navigation/RootNavigation';

function App(): JSX.Element {
  return (
    <RealmProvider>
      <RecoilRoot>
        <RootNavigation />
        <Toast />
      </RecoilRoot>
    </RealmProvider>
  );
}

export default App;
