import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Voca from './src/model/Voca';
import Busu from './src/model/Busu';

Realm.copyBundledRealmFiles();

const realmConfig: Realm.Configuration = {
  schema: [Voca, Busu],
  path: 'bundle.realm',
};

export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
