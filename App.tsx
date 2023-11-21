import React from 'react';
import {RecoilRoot} from 'recoil';
import Toast from './src/module/Toast';
import RootNavigation from './src/navigation/RootNavigation';

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <RootNavigation />
      <Toast />
    </RecoilRoot>
  );
}

export default App;
