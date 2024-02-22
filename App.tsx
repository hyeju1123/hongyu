import React from 'react';
import {RealmProvider} from './RealmConfigContext';
import {RecoilRoot} from 'recoil';
import {VocaProvider} from './src/providers/VocaProvider';
import RootView from './RootView';

function App(): JSX.Element {
  return (
    <RealmProvider>
      <RecoilRoot>
        <VocaProvider>
          <RootView />
        </VocaProvider>
      </RecoilRoot>
    </RealmProvider>
  );
}

export default App;
