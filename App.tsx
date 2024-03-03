import React, {useEffect} from 'react';
import {RealmProvider} from './RealmConfigContext';
import {RecoilRoot} from 'recoil';
import {VocaProvider} from './src/providers/VocaProvider';
import RootView from './RootView';
import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
